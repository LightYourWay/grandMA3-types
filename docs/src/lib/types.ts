export interface UnionMember {
  value: string | number | boolean;
}

export interface Property {
  name: string;
  typeStr: string;
  typeRef: string | null;
  description: string;
  readonly: boolean;
  optional: boolean;
  fromObjProps?: boolean;
}

export interface Param {
  name: string;
  typeStr: string;
  optional: boolean;
  description: string;
}

export interface Signature {
  params: Param[];
  returnType: string;
  description: string;
}

export interface Method {
  name: string;
  description: string;
  signatures: Signature[];
}

export interface TypeItem {
  id: string;
  name: string;
  kind: 'type' | 'interface' | 'variable';
  group: string;
  fullName: string;
  description: string;
  isObjBased: boolean;
  objClassName: string | null;
  parentTypes: string[];
  childType: string | null;
  properties: Property[];
  methods: Method[];
  variableTypeStr?: string;
  isConst?: boolean;
  unionMembers?: UnionMember[] | null;
  sourceFile?: string;
  sourceLine?: number;
}

export interface FunctionItem {
  id: string;
  name: string;
  kind: 'function';
  description: string;
  signatures: Signature[];
  sourceFile?: string;
  sourceLine?: number;
}

export interface EnumMember {
  name: string;
  value: number | null;
  description: string;
}

export interface EnumItem {
  id: string;
  name: string;
  kind: 'enum';
  fullName: string;
  description: string;
  members: EnumMember[];
  sourceFile?: string;
  sourceLine?: number;
}

export interface SearchEntry {
  id: string;
  name: string;
  kind: string;
  parentName?: string;
  parentId?: string;
  description?: string;
}

export interface TreeNode {
  id: string;
  children: TreeNode[];
}

export interface DocsData {
  version: string;
  objectTree: TreeNode;
  items: Record<string, TypeItem>;
  functions: Record<string, FunctionItem>;
  enums: Record<string, EnumItem>;
  groupLists: Record<string, string[]>;
  objMethods: Method[];
  objProperties: Property[];
  searchIndex: SearchEntry[];
}

export type AnyItem = TypeItem | FunctionItem | EnumItem;
