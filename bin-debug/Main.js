/*let debug = (target: any, name: string, descriptor: PropertyDescriptor) => {
  let delegate = descriptor.value;
  descriptor.value = function () {
    let args: string[] = [];
    for (let i = 0; i < arguments.length; i++){
      args.push(arguments[i]);
    }
    console.log(`${name} in: ${args.join()}`);
    let result = delegate.apply(this, arguments);
    console.log(`${name} out: ${result}`);
    return result;
  };
  return descriptor;
};

class Calc {
  @debug
  add (a: number, b: number): number{
    return a + b;
  }
}*/
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        //测试宝石
        var jewel_blue = new Jewel(1, 1);
        console.log("jewel_blue:" + jewel_blue.show());
        var jewel_cyan = new Jewel(5, 3);
        console.log("jewel_cyan:" + jewel_cyan.show());
        //测试秘籍
        var scroll_beat = new Scroll(1, 1);
        console.log("scroll_beat:" + scroll_beat.show());
        var scroll_blizzard = new Scroll(5, 2);
        console.log("scroll_blizzard:" + scroll_blizzard.show());
        //测试装备
        var equip = new Equipment(1);
        console.log("equip:" + equip.show());
        equip.addJewelery([jewel_blue]);
        console.log("equip(jewel_blue):" + equip.show());
        //测试技能
        var skill = new Skill();
        console.log("skill:" + skill.show());
        skill.scroll = scroll_beat;
        console.log("skill(scroll_beat):" + skill.show());
        //测试英雄
        var hero1 = new Hero();
        console.log("hero:" + hero1.show());
        hero1.addEquip(equip);
        console.log("hero(euip):" + hero1.show());
        hero1.addSkill(skill);
        console.log("hero(equip&skill):" + hero1.show());
        //测试玩家
        var hero2 = new Hero();
        var user = new User();
        var title = new Title();
        user.heroes.push(hero1);
        user.heroes.push(hero2);
        console.log("user:" + user.powerPoint);
        user.changeTitle(title);
        console.log("user(title) power:" + user.powerPoint);
        user.heroes[0].inParty = true;
        console.log("user(title, 1 hero) power:" + user.powerPoint);
    };
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map