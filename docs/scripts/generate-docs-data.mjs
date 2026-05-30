import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const typingsDir = join(root, 'typings');

// -- Intermediary type detection (inlined, not exposed in docs) --
const INTERMEDIARY_SUFFIXES = ['Props', 'Properties', 'Children'];
const INTERMEDIARY_EXACT = new Set(['GenericObj']);
const OBJ_BASE_PROPS = new Set(['name', 'nameAndApp', 'index']);

function isIntermediary(name) {
  return INTERMEDIARY_EXACT.has(name) || INTERMEDIARY_SUFFIXES.some(s => name.endsWith(s));
}

// -- Find all .d.ts files recursively --
function findDtsFiles(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) findDtsFiles(full, out);
    else if (e.endsWith('.d.ts')) out.push(full);
  }
  return out;
}

// -- Map file path → sidebar group --
function getGroup(filePath) {
  const rel = relative(typingsDir, filePath).replace(/\\/g, '/');
  if (rel.startsWith('grandMA3.Global/enums')) return 'Enums';
  if (rel.startsWith('grandMA3.Global/functions')) return 'LUA Functions - Object-Free API';
  if (rel.startsWith('grandMA3.Display')) return 'Display / UI';
  if (rel.startsWith('grandMA3.DataPool')) return 'DataPool';
  if (rel.startsWith('grandMA3.Appearances')) return 'Appearances';
  if (rel.startsWith('grandMA3.Patch')) return 'Patch & Fixtures';
  if (rel.startsWith('grandMA3.UserProfile')) return 'User Profile';
  if (rel.startsWith('grandMA3.Remotes')) return 'Remotes';
  if (rel.startsWith('grandMA3.ColorTheme')) return 'Color Theme';
  if (rel.startsWith('lua.')) return 'Lua Libraries.' + rel.split('/')[0].slice(4);
  if (rel.startsWith('grandMA3.Root') || rel.startsWith('grandMA3.Obj') || rel.startsWith('common.d.ts/')) return 'Object Hierarchy';
  return null;
}

// -- Create TypeScript program (parse-only, no type resolution needed) --
const allDtsFiles = findDtsFiles(typingsDir);
console.log(`Parsing ${allDtsFiles.length} .d.ts files with TypeScript compiler API…`);

const program = ts.createProgram(allDtsFiles, {
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
  noEmit: true,
  noResolve: true,
});

const normalizedTypingsDir = typingsDir.replace(/\\/g, '/');

// -- First pass: build name → declaration maps for cross-file reference resolution --
const typeAliasMap = new Map();
const interfaceMap = new Map(); // name → InterfaceDeclaration[]
let objSourceFile; // source file path of the Obj interface
let objSourceLine; // 1-based line number of the Obj interface declaration

for (const sf of program.getSourceFiles()) {
  if (!sf.fileName.replace(/\\/g, '/').startsWith(normalizedTypingsDir)) continue;
  ts.forEachChild(sf, node => {
    if (ts.isTypeAliasDeclaration(node)) {
      if (!typeAliasMap.has(node.name.text)) typeAliasMap.set(node.name.text, node);
    } else if (ts.isInterfaceDeclaration(node)) {
      const name = node.name.text;
      if (!interfaceMap.has(name)) interfaceMap.set(name, []);
      interfaceMap.get(name).push(node);
      if (name === 'Obj' && !objSourceFile) {
        objSourceFile = relative(root, sf.fileName).replace(/\\/g, '/');
        objSourceLine = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf)).line + 1;
      }
    }
  });
}

// -- JSDoc comment text --
function getComment(node) {
  const jsDocs = node.jsDoc;
  if (!Array.isArray(jsDocs) || jsDocs.length === 0) return undefined;
  const doc = jsDocs[jsDocs.length - 1];
  const c = doc.comment;
  if (!c) return undefined;
  if (typeof c === 'string') return c.trim() || undefined;
  if (Array.isArray(c)) return c.map(p => (typeof p === 'string' ? p : p.text ?? '')).join('').trim() || undefined;
  return undefined;
}

// -- JSDoc tag value: returns the comment of the first matching @tagName --
function getJsDocTag(node, tagName) {
  const jsDocs = node.jsDoc;
  if (!Array.isArray(jsDocs) || jsDocs.length === 0) return undefined;
  for (const doc of jsDocs) {
    if (!Array.isArray(doc.tags)) continue;
    for (const tag of doc.tags) {
      if (tag.tagName.text === tagName) {
        const c = tag.comment;
        if (!c) return undefined;
        if (typeof c === 'string') return c.trim() || undefined;
        if (Array.isArray(c)) return c.map(p => (typeof p === 'string' ? p : p.text ?? '')).join('').trim() || undefined;
      }
    }
  }
  return undefined;
}

// -- Entity name (Identifier or QualifiedName) → string --
function entityNameStr(name) {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isQualifiedName(name)) return entityNameStr(name.left) + '.' + name.right.text;
  return '_';
}

// -- Property/member name from TS NameNode --
function propName(nameNode) {
  if (!nameNode) return '_';
  if (ts.isIdentifier(nameNode)) return nameNode.text;
  if (ts.isStringLiteral(nameNode)) return nameNode.text;
  if (ts.isNumericLiteral(nameNode)) return nameNode.text;
  if (ts.isPrivateIdentifier && ts.isPrivateIdentifier(nameNode)) return nameNode.text;
  try { return nameNode.getText(); } catch { return '_'; }
}

// -- TypeNode AST → display string --
function typeNodeToStr(t, depth = 0) {
  if (!t) return 'unknown';
  if (depth > 6) return '…';
  switch (t.kind) {
    case ts.SyntaxKind.StringKeyword: return 'string';
    case ts.SyntaxKind.NumberKeyword: return 'number';
    case ts.SyntaxKind.BooleanKeyword: return 'boolean';
    case ts.SyntaxKind.VoidKeyword: return 'void';
    case ts.SyntaxKind.AnyKeyword: return 'any';
    case ts.SyntaxKind.NeverKeyword: return 'never';
    case ts.SyntaxKind.UnknownKeyword: return 'unknown';
    case ts.SyntaxKind.NullKeyword: return 'null';
    case ts.SyntaxKind.UndefinedKeyword: return 'undefined';
    case ts.SyntaxKind.ObjectKeyword: return 'object';
    case ts.SyntaxKind.SymbolKeyword: return 'symbol';
    case ts.SyntaxKind.BigIntKeyword: return 'bigint';
    case ts.SyntaxKind.LiteralType: {
      const lit = t.literal;
      if (ts.isStringLiteral(lit)) return JSON.stringify(lit.text);
      if (ts.isNumericLiteral(lit)) return lit.text;
      if (ts.isPrefixUnaryExpression(lit) && lit.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(lit.operand)) return '-' + lit.operand.text;
      if (lit.kind === ts.SyntaxKind.TrueKeyword) return 'true';
      if (lit.kind === ts.SyntaxKind.FalseKeyword) return 'false';
      if (lit.kind === ts.SyntaxKind.NullKeyword) return 'null';
      try { return lit.getText(); } catch { return 'unknown'; }
    }
    case ts.SyntaxKind.TypeReference: {
      const name = entityNameStr(t.typeName);
      if (t.typeArguments?.length) return name + '<' + t.typeArguments.map(a => typeNodeToStr(a, depth + 1)).join(', ') + '>';
      return name;
    }
    case ts.SyntaxKind.ArrayType: return typeNodeToStr(t.elementType, depth + 1) + '[]';
    case ts.SyntaxKind.UnionType: {
      const parts = t.types.map(u => typeNodeToStr(u, depth + 1));
      if (depth === 0 && parts.length > 6) return parts.slice(0, 6).join(' | ') + ' | …';
      return parts.join(' | ');
    }
    case ts.SyntaxKind.IntersectionType: return t.types.map(u => typeNodeToStr(u, depth + 1)).join(' & ');
    case ts.SyntaxKind.TupleType: return '[' + t.elements.map(e => typeNodeToStr(e, depth + 1)).join(', ') + ']';
    case ts.SyntaxKind.TypeLiteral: {
      const props = t.members.filter(ts.isPropertySignature);
      return props.length ? '{ ' + props.map(p => propName(p.name)).join(', ') + ' }' : '{ }';
    }
    case ts.SyntaxKind.TemplateLiteralType:
      return '`' + t.head.text + t.templateSpans.map(s => '${' + typeNodeToStr(s.type, depth + 1) + '}' + s.literal.text).join('') + '`';
    case ts.SyntaxKind.ConditionalType:
      return typeNodeToStr(t.checkType, depth + 1) + ' extends ' + typeNodeToStr(t.extendsType, depth + 1) + ' ? ' + typeNodeToStr(t.trueType, depth + 1) + ' : ' + typeNodeToStr(t.falseType, depth + 1);
    case ts.SyntaxKind.MappedType: return '{ [key]: … }';
    case ts.SyntaxKind.IndexedAccessType: return typeNodeToStr(t.objectType, depth + 1) + '[' + typeNodeToStr(t.indexType, depth + 1) + ']';
    case ts.SyntaxKind.TypeOperator: return (ts.tokenToString(t.operator) ?? '') + ' ' + typeNodeToStr(t.type, depth + 1);
    case ts.SyntaxKind.RestType: return '...' + typeNodeToStr(t.type, depth + 1);
    case ts.SyntaxKind.OptionalType: return typeNodeToStr(t.type, depth + 1) + '?';
    case ts.SyntaxKind.NamedTupleMember: return t.name.text + (t.questionToken ? '?' : '') + ': ' + typeNodeToStr(t.type, depth + 1);
    case ts.SyntaxKind.ParenthesizedType: return typeNodeToStr(t.type, depth);
    case ts.SyntaxKind.InferType: return 'infer ' + t.typeParameter.name.text;
    case ts.SyntaxKind.TypeQuery: return 'typeof ' + entityNameStr(t.exprName);
    case ts.SyntaxKind.FunctionType: {
      const params = t.parameters.map(p => propName(p.name) + (p.questionToken ? '?' : '') + ': ' + typeNodeToStr(p.type, depth + 1));
      return '(' + params.join(', ') + ') => ' + typeNodeToStr(t.type, depth + 1);
    }
    case ts.SyntaxKind.ConstructorType: {
      const params = t.parameters.map(p => propName(p.name) + ': ' + typeNodeToStr(p.type, depth + 1));
      return 'new (' + params.join(', ') + ') => ' + typeNodeToStr(t.type, depth + 1);
    }
    default: try { return t.getText(); } catch { return 'unknown'; }
  }
}

// -- Extract union literal members (null if any member is not a primitive literal) --
function extractUnionMembers(typeNode) {
  if (!ts.isUnionTypeNode(typeNode)) return null;
  const members = [];
  for (const t of typeNode.types) {
    if (!ts.isLiteralTypeNode(t)) return null;
    const lit = t.literal;
    if (ts.isStringLiteral(lit)) members.push({ value: lit.text });
    else if (ts.isNumericLiteral(lit)) members.push({ value: Number(lit.text) });
    else if (ts.isPrefixUnaryExpression(lit) && lit.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(lit.operand))
      members.push({ value: -Number(lit.operand.text) });
    else if (lit.kind === ts.SyntaxKind.TrueKeyword) members.push({ value: true });
    else if (lit.kind === ts.SyntaxKind.FalseKeyword) members.push({ value: false });
    else return null;
  }
  return members.length > 0 ? members : null;
}

// -- Simple type reference for navigation links (non-generic, known declared type) --
function getSimpleRef(typeNode) {
  if (!typeNode || !ts.isTypeReferenceNode(typeNode) || typeNode.typeArguments?.length) return null;
  const name = entityNameStr(typeNode.typeName);
  if (isIntermediary(name)) return null;
  if (typeAliasMap.has(name) || interfaceMap.has(name)) return name;
  return null;
}

// -- Extract properties from TypeNode (handles intersections + intermediary inlining) --
// fromObjProps: true when content originates from a *Properties/*Props intermediary (ObjProps),
// false when it originates from inline type literals or *Children intermediaries.
function extractPropsFromTypeNode(typeNode, visited = new Set(), fromObjProps = false) {
  if (!typeNode) return [];
  const result = [];

  if (ts.isIntersectionTypeNode(typeNode)) {
    for (const t of typeNode.types) result.push(...extractPropsFromTypeNode(t, visited, fromObjProps));
  } else if (ts.isTypeLiteralNode(typeNode)) {
    for (const m of typeNode.members) {
      if (ts.isPropertySignature(m)) {
        const name = propName(m.name);
        if (OBJ_BASE_PROPS.has(name)) continue;
        result.push({
          name,
          typeStr: typeNodeToStr(m.type),
          typeRef: getSimpleRef(m.type),
          description: getComment(m),
          readonly: !!m.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword),
          optional: !!m.questionToken,
          fromObjProps,
        });
      } else if (ts.isMethodSignature(m)) {
        const name = propName(m.name);
        if (OBJ_BASE_PROPS.has(name)) continue;
        const params = (m.parameters ?? []).map(p =>
          propName(p.name) + (p.questionToken ? '?' : '') + ': ' + typeNodeToStr(p.type)
        );
        result.push({
          name,
          typeStr: '(' + params.join(', ') + ') => ' + typeNodeToStr(m.type),
          typeRef: null,
          description: getComment(m),
          readonly: false,
          optional: !!m.questionToken,
          fromObjProps,
        });
      }
    }
  } else if (ts.isTypeReferenceNode(typeNode)) {
    const refName = entityNameStr(typeNode.typeName);
    if (isIntermediary(refName) && !visited.has(refName)) {
      const next = new Set(visited);
      next.add(refName);
      // *Properties/*Props intermediaries mark their contents as ObjProps
      const resolvedFromObjProps = fromObjProps || refName.endsWith('Properties') || refName.endsWith('Props');
      // Resolve via TypeAlias
      const aliasDecl = typeAliasMap.get(refName);
      if (aliasDecl) result.push(...extractPropsFromTypeNode(aliasDecl.type, next, resolvedFromObjProps));
      // Resolve via Interface (e.g. ObjProps declared as interface)
      for (const iDecl of interfaceMap.get(refName) ?? []) {
        for (const m of iDecl.members) {
          if (!ts.isPropertySignature(m)) continue;
          const mName = propName(m.name);
          if (OBJ_BASE_PROPS.has(mName)) continue;
          result.push({
            name: mName,
            typeStr: typeNodeToStr(m.type),
            typeRef: getSimpleRef(m.type),
            description: getComment(m),
            readonly: !!m.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword),
            optional: !!m.questionToken,
            fromObjProps: resolvedFromObjProps,
          });
        }
      }
    }
  } else if (ts.isParenthesizedTypeNode(typeNode)) {
    result.push(...extractPropsFromTypeNode(typeNode.type, visited, fromObjProps));
  }

  return result;
}

// -- Extract Obj<ClassName, ParentType, ChildType> info from intersection --
function getObjInfo(typeNode) {
  if (!typeNode) return null;
  const types = ts.isIntersectionTypeNode(typeNode) ? typeNode.types : [typeNode];
  for (const t of types) {
    if (!ts.isTypeReferenceNode(t) || entityNameStr(t.typeName) !== 'Obj' || !t.typeArguments?.length) continue;
    const [cls, par, chi] = t.typeArguments;
    const className = cls && ts.isLiteralTypeNode(cls) && ts.isStringLiteral(cls.literal) ? cls.literal.text : undefined;

    // Parent type: single TypeRef or union of TypeRefs
    const SKIP = new Set(['never', 'unknown', 'any']);
    let parentTypes = [];
    if (par) {
      if (ts.isTypeReferenceNode(par)) {
        const n = entityNameStr(par.typeName);
        if (!SKIP.has(n)) parentTypes = [n];
      } else if (ts.isUnionTypeNode(par)) {
        parentTypes = par.types
          .filter(u => ts.isTypeReferenceNode(u))
          .map(u => entityNameStr(u.typeName))
          .filter(n => !SKIP.has(n));
      }
    }

    const childKind = chi?.kind;
    const childType = chi && childKind !== ts.SyntaxKind.NeverKeyword && childKind !== ts.SyntaxKind.UnknownKeyword && childKind !== ts.SyntaxKind.AnyKeyword
      ? typeNodeToStr(chi) : undefined;
    return { className, parentTypes, childType };
  }
  return null;
}

// -- Build a function call signature from a FunctionDeclaration or MethodSignature --
function makeSig(node) {
  return {
    params: (node.parameters ?? []).map(p => ({
      name: propName(p.name),
      typeStr: typeNodeToStr(p.type),
      optional: !!p.questionToken || !!p.dotDotDotToken,
      description: getComment(p),
    })),
    returnType: typeNodeToStr(node.type),
    description: getComment(node),
  };
}

// -- Process interface members → { props, methods } --
function processInterfaceMembers(members) {
  const props = [], methods = [];
  for (const m of members) {
    if (ts.isPropertySignature(m)) {
      const name = propName(m.name);
      if (OBJ_BASE_PROPS.has(name)) continue;
      props.push({
        name,
        typeStr: typeNodeToStr(m.type),
        typeRef: getSimpleRef(m.type),
        description: getComment(m),
        readonly: !!m.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword),
        optional: !!m.questionToken,
      });
    } else if (ts.isMethodSignature(m)) {
      methods.push({
        name: propName(m.name),
        description: getComment(m),
        signatures: [makeSig(m)],
      });
    }
  }
  return { props, methods };
}

// -- Recursively extract Enums namespace members --
function extractEnums(moduleNode, result, sourceFile, sf, parentGroup = 'Enums') {
  const body = moduleNode.body;
  if (!body || !ts.isModuleBlock(body)) return;
  for (const stmt of body.statements) {
    if (ts.isEnumDeclaration(stmt)) {
      const name = stmt.name.text;
      result['Enums.' + name] = {
        id: 'Enums.' + name,
        name,
        fullName: 'Enums.' + name,
        kind: 'enum',
        group: getJsDocTag(stmt, 'group') ?? parentGroup,
        sourceFile,
        sourceLine: ts.getLineAndCharacterOfPosition(sf, stmt.getStart(sf)).line + 1,
        description: getComment(stmt),
        members: stmt.members.map(m => {
          const mName = propName(m.name);
          let value = null;
          if (m.initializer) {
            if (ts.isNumericLiteral(m.initializer)) value = Number(m.initializer.text);
            else if (ts.isPrefixUnaryExpression(m.initializer) && m.initializer.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(m.initializer.operand)) {
              value = -Number(m.initializer.operand.text);
            }
          }
          return { name: mName, value, description: getComment(m) };
        }),
      };
    } else if (ts.isModuleDeclaration(stmt)) {
      extractEnums(stmt, result, sourceFile, sf, getJsDocTag(stmt, 'group') ?? parentGroup);
    }
  }
}

// ── Main pass ─────────────────────────────────────────────────────────
const items = {};
const functions = {};
const enums = {};

for (const sf of program.getSourceFiles()) {
  if (!sf.fileName.replace(/\\/g, '/').startsWith(normalizedTypingsDir)) continue;

  const group = getGroup(sf.fileName);
  if (!group) continue;

  const sourceFile = relative(root, sf.fileName).replace(/\\/g, '/');

  ts.forEachChild(sf, node => {
    if (group === 'Enums') {
      if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'Enums') {
        extractEnums(node, enums, sourceFile, sf);
      }
      return;
    }

    if (ts.isTypeAliasDeclaration(node)) {
      const name = node.name.text;
      if (name === 'Obj' || isIntermediary(name) || items[name]) return;
      const info = getObjInfo(node.type);
      const nodeGroup = getJsDocTag(node, 'group') ?? group;
      items[name] = {
        id: name, name, kind: 'type', group: nodeGroup, sourceFile,
        sourceLine: ts.getLineAndCharacterOfPosition(sf, node.getStart(sf)).line + 1,
        description: getComment(node),
        objClassName: info?.className ?? null,
        parentTypes: info?.parentTypes ?? [],
        childType: info?.childType ?? null,
        isObjBased: !!info,
        properties: extractPropsFromTypeNode(node.type),
        methods: [],
        unionMembers: extractUnionMembers(node.type),
      };
    } else if (ts.isInterfaceDeclaration(node) && node.name.text !== 'Obj') {
      const name = node.name.text;
      if (isIntermediary(name) || items[name]) return;
      const { props, methods } = processInterfaceMembers(node.members);
      const nodeGroup = getJsDocTag(node, 'group') ?? group;
      items[name] = {
        id: name, name, kind: 'interface', group: nodeGroup, sourceFile,
        sourceLine: ts.getLineAndCharacterOfPosition(sf, node.getStart(sf)).line + 1,
        description: getComment(node),
        objClassName: null, parentTypes: [], childType: null, isObjBased: false,
        properties: props, methods,
      };
    } else if (ts.isFunctionDeclaration(node) && node.name) {
      const name = node.name.text;
      const fnId = 'fn:' + name;
      const sig = makeSig(node);
      if (functions[fnId]) {
        functions[fnId].signatures.push(sig);
      } else {
        functions[fnId] = {
          id: fnId, name, kind: 'function', group: getJsDocTag(node, 'group') ?? group, sourceFile,
          sourceLine: ts.getLineAndCharacterOfPosition(sf, node.getStart(sf)).line + 1,
          description: getComment(node),
          signatures: [sig],
        };
      }
    } else if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) {
      const moduleName = node.name.text;
      const body = node.body;
      if (!body || !ts.isModuleBlock(body)) return;
      const moduleComment = getComment(node);
      const moduleGroup = getJsDocTag(node, 'group') ?? group;
      for (const stmt of body.statements) {
        const mods = ts.canHaveModifiers(stmt) ? ts.getModifiers(stmt) : undefined;
        const isExported = mods?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
        if (!isExported) continue;
        if (ts.isFunctionDeclaration(stmt) && stmt.name) {
          const fnName = stmt.name.text;
          const id = moduleName + '.' + fnName;
          const sig = makeSig(stmt);
          if (functions[id]) {
            functions[id].signatures.push(sig);
          } else {
            functions[id] = {
              id, name: fnName, kind: 'function', group: getJsDocTag(stmt, 'group') ?? moduleGroup, sourceFile,
              sourceLine: ts.getLineAndCharacterOfPosition(sf, stmt.getStart(sf)).line + 1,
              description: getComment(stmt) ?? moduleComment,
              signatures: [sig],
            };
          }
        } else if (ts.isVariableStatement(stmt)) {
          const comment = getComment(stmt);
          const isConst = !!(stmt.declarationList.flags & ts.NodeFlags.Const);
          for (const decl of stmt.declarationList.declarations) {
            if (!ts.isIdentifier(decl.name)) continue;
            const varName = decl.name.text;
            const id = moduleName + '.' + varName;
            if (items[id]) continue;
            let variableTypeStr = 'any';
            if (decl.type) {
              variableTypeStr = typeNodeToStr(decl.type);
            } else if (decl.initializer) {
              if (ts.isNumericLiteral(decl.initializer)) variableTypeStr = decl.initializer.text;
              else if (ts.isStringLiteral(decl.initializer)) variableTypeStr = 'string';
              else if (decl.initializer.kind === ts.SyntaxKind.TrueKeyword || decl.initializer.kind === ts.SyntaxKind.FalseKeyword) variableTypeStr = 'boolean';
            }
            items[id] = {
              id, name: varName, kind: 'variable', group: getJsDocTag(stmt, 'group') ?? moduleGroup, sourceFile,
              sourceLine: ts.getLineAndCharacterOfPosition(sf, stmt.getStart(sf)).line + 1,
              description: comment,
              variableTypeStr, isConst,
              objClassName: null, parentTypes: [], childType: null, isObjBased: false,
              properties: [], methods: [],
            };
          }
        } else if (ts.isTypeAliasDeclaration(stmt) && !isIntermediary(stmt.name.text)) {
          const typeName = stmt.name.text;
          const id = moduleName + '.' + typeName;
          if (items[id]) continue;
          items[id] = {
            id, name: typeName, kind: 'type', group: getJsDocTag(stmt, 'group') ?? moduleGroup, sourceFile,
            sourceLine: ts.getLineAndCharacterOfPosition(sf, stmt.getStart(sf)).line + 1,
            description: getComment(stmt),
            objClassName: null, parentTypes: [], childType: null, isObjBased: false,
            properties: extractPropsFromTypeNode(stmt.type), methods: [],
            unionMembers: extractUnionMembers(stmt.type),
          };
        } else if (ts.isInterfaceDeclaration(stmt) && !isIntermediary(stmt.name.text)) {
          const ifaceName = stmt.name.text;
          const id = moduleName + '.' + ifaceName;
          if (items[id]) continue;
          const { props, methods } = processInterfaceMembers(stmt.members);
          items[id] = {
            id, name: ifaceName, kind: 'interface', group: getJsDocTag(stmt, 'group') ?? moduleGroup, sourceFile,
            sourceLine: ts.getLineAndCharacterOfPosition(sf, stmt.getStart(sf)).line + 1,
            description: getComment(stmt),
            objClassName: null, parentTypes: [], childType: null, isObjBased: false,
            properties: props, methods,
          };
        }
      }
    }
  });
}

// -- Add Obj interface itself (handled separately from main loop) --
const objDecls = interfaceMap.get('Obj') ?? [];
if (objDecls.length) {
  const allProps = [], allMethods = [];
  for (const decl of objDecls) {
    const { props, methods } = processInterfaceMembers(decl.members);
    allProps.push(...props);
    allMethods.push(...methods);
  }
  items['Obj'] = {
    id: 'Obj', name: 'Obj', kind: 'interface', group: 'Object Hierarchy',
    sourceFile: objSourceFile, sourceLine: objSourceLine,
    description: getComment(objDecls[0]),
    objClassName: null, parentTypes: [], childType: null, isObjBased: false,
    properties: allProps, methods: allMethods,
  };
}

// Obj methods are shown collapsed on all Obj-based type pages
const objMethods = items['Obj']?.methods ?? [];

// All Obj properties shown expanded on all Obj-based type pages
const objProperties = [];
for (const decl of objDecls) {
  for (const m of decl.members) {
    if (!ts.isPropertySignature(m)) continue;
    const name = propName(m.name);
    objProperties.push({
      name,
      typeStr: typeNodeToStr(m.type),
      typeRef: getSimpleRef(m.type),
      description: getComment(m),
      readonly: !!m.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword),
      optional: !!m.questionToken,
    });
  }
}

// Add Obj methods to functions map as LUA Functions - Object API
for (const m of objMethods) {
  const id = 'Obj.' + m.name;
  functions[id] = { id, name: m.name, kind: 'function', group: 'LUA Functions - Object API',
    sourceFile: items['Obj']?.sourceFile, sourceLine: items['Obj']?.sourceLine,
    description: m.description, signatures: m.signatures };
}

// ── Object tree from Root ─────────────────────────────────────────────
const itemNames = new Set(Object.keys(items));

// Index: parentType → [child ids that declare themselves children via Obj<,Parent,>]
const declaredChildren = {};
for (const [id, item] of Object.entries(items)) {
  if (item.isObjBased && item.parentTypes?.length) {
    for (const pt of item.parentTypes) {
      if (itemNames.has(pt)) (declaredChildren[pt] ??= []).push(id);
    }
  }
}

function buildTree(typeId, depth = 0, visited = new Set()) {
  if (depth > 10 || visited.has(typeId)) return null;
  const type = items[typeId];
  if (!type) return null;
  const seen = new Set(visited);
  seen.add(typeId);

  // Named property children (obj-based, non-fromObjProps)
  const propChildIds = (type.properties ?? [])
    .filter(p => p.typeRef && itemNames.has(p.typeRef) && !p.fromObjProps && items[p.typeRef]?.isObjBased)
    .map(p => p.typeRef);

  // Indexed / implicit children declared via parentType on the child side
  const parentDeclaredIds = declaredChildren[typeId] ?? [];

  // Deduplicate
  const allChildIds = [...new Set([...propChildIds, ...parentDeclaredIds])];

  const children = allChildIds
    .map(id => buildTree(id, depth + 1, seen))
    .filter(Boolean);
  return { id: typeId, children };
}

const objectTree = buildTree('Root') ?? { id: 'Root', children: [] };

// ── Group index lists ──────────────────────────────────────────────────
const groupLists = {};

// Items by group
for (const [id, item] of Object.entries(items)) {
  if (!item.group) continue;
  if (!groupLists[item.group]) groupLists[item.group] = [];
  groupLists[item.group].push(id);
}

// Functions by group (includes Object API methods + Object-Free API)
for (const [id, fn] of Object.entries(functions)) {
  if (!fn.group) continue;
  if (!groupLists[fn.group]) groupLists[fn.group] = [];
  groupLists[fn.group].push(id);
}

// Objects: flat alphabetical list of all Obj-based types
groupLists['Objects'] = Object.values(items)
  .filter(i => i.isObjBased)
  .map(i => i.id)
  .sort((a, b) => a.localeCompare(b));

for (const g of Object.keys(groupLists)) groupLists[g].sort((a, b) => a.localeCompare(b));

// ── Search index ───────────────────────────────────────────────────────
const searchIndex = [];
for (const [id, item] of Object.entries(items)) {
  searchIndex.push({ id, kind: item.kind, name: item.name, group: item.group, description: item.description?.slice(0, 120) });
  for (const p of item.properties ?? []) {
    searchIndex.push({ id: id + '.' + p.name, kind: 'property', name: p.name, parentId: id, parentName: id });
  }
}
for (const [id, fn] of Object.entries(functions)) {
  searchIndex.push({ id, kind: 'function', name: fn.name, description: fn.description?.slice(0, 120) });
}
for (const [id, en] of Object.entries(enums)) {
  searchIndex.push({ id, kind: 'enum', name: en.name, description: en.description?.slice(0, 120) });
  for (const m of en.members) {
    searchIndex.push({ id: id + '.' + m.name, kind: 'enumMember', name: m.name, parentId: id, parentName: en.name });
  }
}

// ── Output ─────────────────────────────────────────────────────────────
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const outDir = join(root, 'docs/public');
mkdirSync(outDir, { recursive: true });
const output = { version, generated: new Date().toISOString(), items, functions, enums, objMethods, objProperties, objectTree, groupLists, searchIndex };
writeFileSync(join(outDir, 'data.json'), JSON.stringify(output));

const kb = Math.round(Buffer.byteLength(JSON.stringify(output)) / 1024);
console.log(`✓ ${Object.keys(items).length} types, ${Object.keys(functions).length} functions, ${Object.keys(enums).length} enums`);
console.log(`✓ docs/public/data.json  ${kb} KB`);
