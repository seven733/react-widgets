# `widgets - react 组件库`

## Concept & Principle

* 封装功能而不封装样式，功能本身也是组件
* 多组件封装，封装用户操作流程、习惯、安全性配置等
* 尽量保证与原生组件(html standard)API一致性
* 可提供一定的默认样式(尽量在createDefaultStyle中增加css)，但需保证被覆盖的灵活性
* 至少提供snapshot test, 保证前后UI的向前兼容，不能兼容时需告知所有相关方
* 提倡单元测试、每一个bug必须有测试对应以便自动回归(组件bug在git仓库提issue)

## Usage


