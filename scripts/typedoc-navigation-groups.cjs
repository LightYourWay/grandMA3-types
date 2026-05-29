const { Converter, ReflectionGroup } = require('typedoc');

const GROUP_ORDER = [
	'Classes',
	'Object based functions',
	'Global functions',
	'Enums',
	'External namespaces / libs',
];

function classifyModule(moduleName) {
	if (moduleName === 'grandMA3.Global/enums' || moduleName.startsWith('grandMA3.Global/enums/')) {
		return 'Enums';
	}

	if (moduleName.startsWith('lua.')) {
		return 'External namespaces / libs';
	}

	if (moduleName === 'grandMA3.Global/functions') {
		return 'Global functions';
	}

	if (moduleName.endsWith('/functions') || moduleName.endsWith('/function')) {
		return 'Object based functions';
	}

	if (moduleName === 'common.d.ts') {
		return 'Classes';
	}

	if (moduleName === 'index' || !moduleName.includes('/')) {
		return undefined;
	}

	return 'Classes';
}

exports.load = function load(app) {
	app.converter.on(Converter.EVENT_RESOLVE_END, (context) => {
		const project = context.project;
		const groups = new Map(GROUP_ORDER.map((name) => [name, new ReflectionGroup(name, project)]));

		for (const moduleReflection of project.children || []) {
			const group = groups.get(classifyModule(moduleReflection.name));

			if (group) {
				group.children.push(moduleReflection);
			}
		}

		project.groups = GROUP_ORDER.map((name) => groups.get(name)).filter(
			(group) => group.children.length > 0,
		);
	});
};
