// 插件检测，IE10 及更低版本无效
let hasPlugin = function (name) {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}
// 检测 Flash
alert(hasPlugin("Flash"));
// 检测 QuickTime
alert(hasPlugin("QuickTime"));