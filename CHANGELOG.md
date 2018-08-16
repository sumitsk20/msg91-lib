# Changelog

### 1.1.0-beta.1 (Aug 15, 2018)
**NOTE:** This is a beta version of this release. There may be functionality that might be broken in,
though we suspect that builds are hanging and not erroring.

New Functionality:

- Added support for MSG91 Send SMS API

Updates:

- Updated core `index.js` to export two module instead of one as in previous version.
- Added `return` to every `reject` call in msg91OTP

Breaking:

- **DEPRICIATING**: Update in `index.js` now export module as `msg91OTP` and `msg91SMS`, previously it was exporting
 single module as `msg91`. 

### 1.0.4 (Aug 15, 2018)

- Updating response structure from JSON to original Object. ([#3](https://github.com/sumitsk20/msg91-lib/pull/3))

### 1.0.3 (Aug 15, 2018)

- Removing extra files from source code.

### 1.0.2 (Aug 15, 2018)

- Changing project description.

### 1.0.1 (Aug 15, 2018)

- Adding `README` and `MIT LICENCE`

### 1.0.0 (Aug 15, 2018)

- Initial release
