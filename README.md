# naive-ui
TuSimple Vue-Based Frontend Component Library
## Documentation
[http://***REMOVED***/#/start](http://***REMOVED***/#/start)
## Repository
[https://***REMOVED***/naive-ui/tree/develop](https://***REMOVED***/naive-ui/tree/develop)
## Develop Guidelines
### Git Commit Message Style
You **MUST** follow [Angular Commit Format](https://gist.github.com/brianclements/841ea7bffdb01346392c).

If you want see some example, see [Angular Commits on Github](https://github.com/angular/angular/commits/master).
### Code Styles
#### Javascript Style
You **MUST** follow [Standard JS](https://standardjs.com/).
#### SCSS Style
Run `npm run lint-style` to check styles.
#### Check Both
Run `npm run lint`
You **MUST** fix all lint warnings and errors before you push your branch.
### Unit test
If you create a component, you **MUST** add unit test for it.

Run `npm run test` to test all components.
Run `npm run test-cov` to test all components and see detailed test coverage report.

## Want to see how component works
1. Run `npm run build`
2. Open `http://localhost:8086/` in browser.
## Want to add your own component
There is no guideline for now. If you want to know how to do it, you can explore by yourself or ask `lecong.zhang@tusimple.ai`.
## Publish a new version
1. You **MUST** change your version according to [semver](https://semver.org/)
2. `npm run release`
3. You **MAY** publish documentation by running `npm run release-doc`
## Installation & Usage
First install it.
```
npm install --save-dev naive-ui
```
Then add the following lines in you entry point js file.
```
...
import naiveUi from 'naive-ui'
import 'naive-ui/dist/lib/index.css

Vue.use(naiveUi)
...
```
## Component Develop Status
|Component|Develop status|Unit Test|Note|
|--|:--:|:--:|--|
|Alert|😍|❌||
|Button|😍|🆗||
|Checkbox|😍|🆗||
|DatePicker|😍|❌||
|GradientText|😍|🆗||
|Icon|😍|🆗||
|Input|😍|🆗||
|Message|😍|❌|Code clean in need|
|Modal|😍|❌|Code clean in need|
|Notification|😍|❌|Code clean in need|
|Pagination|😍|🆗|Unit test is not enough|
|Select|😍|🆗|Multiple search is not done|
|Switch|😍|❌||
|FormItem|🚧|❌||
|Form|🚧|❌||
|Table|🚧|❌|Function is not fulfilled|
|Tooltip|😍|❌||
|Popover|😍|❌||
|InputNumber|🚧|||
|Radio|🚧|||
|Tab|🚧|||
|Breadcrumb|🚧|||
|Badge|🚧|||
|Steps|🚧|||
## Todo
1. Z-index management on `Select` & `Tooltip` & `Modal`(Low Priority)
2. Full featured table component(Medium Priority)
3. Form component(Medium Priority)
4. FormItem component(High Priority)
5. Complete unit test for all existing components(High Priority)
6. Create a Markdown webpack loader to convert documentation(Low Priority)
7. Refactor documentation page(for code clairity)
8. Code refactor for some 😢  messy code(which is my bad...)
9. Refactor CSS use mixins(which means I should learn SCSS hard...)