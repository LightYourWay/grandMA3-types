# grandMA3 types for TypeScriptToLua

:warning: **OPEN ALPHA** &rarr; as there is no official API reference from MAlighting avaliable type declarations may be faulty or incomplete.

TypeScript definitions for grandMA3 Lua API.

## install for production
```bash
npm install -D grandMA3-types
```

## install for development

```bash
git clone https://github.com/LightYourWay/grandMA3-types.git && \
cd <your-plugin-folder> && \
npm link ../grandMA3-types
```

## integrate into `tsconfig.json`

```json
{
	"compilerOptions": {
		"types": ["grandMA3-types"]
	}
}
```

## Contributors

If you have something to contribute / add to the type declarations - **AWESOME** :tada: feel free to:
- [create a **GitHub Issue**](https://github.com/LightYourWay/grandMA3-types/issues/new/choose) for it.
- Or better yet, fork and create a PR with your changes.

## License

Copyright (C) Lukas Runge Veranstaltungstechnik

This project is licensed under the **GNU Lesser General Public License v3.0 or later** (LGPL-3.0-or-later).

See [COPYING.LESSER](./COPYING.LESSER) for the LGPL v3 text and [COPYING](./COPYING) for the GPL v3 text (which the LGPL v3 incorporates by reference).
