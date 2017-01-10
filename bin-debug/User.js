var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var logger = function (target, name, descriptor) {
    var delegate = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        console.log(name + " in: " + args.join());
        var result = delegate.apply(this, arguments);
        console.log(name + " out: " + result);
        return result;
    };
    return descriptor;
};
/**用户，一级 */
var User = (function () {
    function User() {
        this.heroes = [];
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "heroesInTeam"
        ,function () {
            return this.heroes.filter(function (value) {
                return (value.inParty);
            });
        }
    );
    p.changeTitle = function (title) {
        this.title = title;
        if (this.heroes) {
            this.heroes.forEach(function (value) {
                value.title = title;
            });
        }
    };
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            var heroes = this.heroesInTeam;
            if (heroes) {
                heroes.forEach(function (value) {
                    result += value.powerPoint;
                });
            }
            if (this.title)
                result += this.title.powerPoint;
            return result;
        }
    );
    return User;
}());
egret.registerClass(User,'User');
/**英雄，二级 */
var Hero = (function () {
    function Hero(level, quality) {
        if (level === void 0) { level = 1; }
        if (quality === void 0) { quality = 1; }
        this.quality = 1;
        this.level = 1;
        this.inParty = false;
        this.equipment = [];
        this.skill = [];
        this.title = new Title();
        this.inParty = false;
    }
    var d = __define,c=Hero,p=c.prototype;
    p.addEquip = function (equip) {
        this.equipment.push(equip);
    };
    p.removeEquip = function (equip) {
        var index = this.equipment.indexOf(equip);
        this.equipment.slice(index, 1);
    };
    p.addSkill = function (skill) {
        this.skill.push(skill);
    };
    p.removeSkill = function (skill) {
        var index = this.skill.indexOf(skill);
        this.skill.slice(index, 1);
    };
    d(p, "atk"
        ,function () {
            var result = 50 * this.quality * this.level;
            this.equipment.forEach(function (value) { result += value.def; });
            result += this.title.def;
            return result;
        }
    );
    d(p, "def"
        ,function () {
            var result = 50 * this.quality * this.level;
            this.skill.forEach(function (value) { result += value.atk; });
            this.equipment.forEach(function (value) { result += value.atk; });
            result += this.title.atk;
            return result;
        }
    );
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            if (this.equipment) {
                this.equipment.forEach(function (value) { result += value.powerPoint; });
            }
            if (this.title)
                result += this.title.powerPoint;
            if (this.skill) {
                this.skill.forEach(function (value) { result += value.powerPoint; });
            }
            return result + this.quality * 28 + this.level * 5;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    __decorate([
        logger
    ], p, "addEquip", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
/**称号，二级 */
var Title = (function () {
    function Title() {
        this.quality = 1;
    }
    var d = __define,c=Title,p=c.prototype;
    p.consturctor = function (quality) {
        if (quality === void 0) { quality = 1; }
        this.quality = quality;
    };
    d(p, "atk"
        ,function () {
            return this.quality * 6.5;
        }
    );
    d(p, "def"
        ,function () {
            return this.quality * 4.5;
        }
    );
    d(p, "powerPoint"
        ,function () {
            return this.quality * 5;
        }
    );
    p.show = function () {
        return " " +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Title;
}());
egret.registerClass(Title,'Title');
/**装备，三级 */
var Equipment = (function () {
    function Equipment(quality, jewelery) {
        if (quality === void 0) { quality = 1; }
        this.quality = 1;
        this.jewelery = [];
        this.quality = quality;
        if (jewelery)
            this.jewelery = jewelery;
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.addJewelery = function (jewelery) {
        this.jewelery = this.jewelery.concat(jewelery);
    };
    d(p, "atk"
        ,function () {
            var result = 0;
            if (this.jewelery)
                this.jewelery.forEach(function (value, index, array) { result += value.atk; });
            return this.quality * 5.5 + result;
        }
    );
    d(p, "def"
        ,function () {
            var result = 0;
            if (this.jewelery)
                this.jewelery.forEach(function (value, index, array) { result += value.atk; });
            return this.quality * 1.5 + result;
        }
    );
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            if (this.jewelery)
                this.jewelery.forEach(function (value) { result += value.powerPoint; });
            return result + this.quality * 5;
        }
    );
    p.show = function () {
        return " " +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
/**宝石，四级 */
var Jewel = (function () {
    function Jewel(quality, level) {
        if (quality === void 0) { quality = 1; }
        if (level === void 0) { level = 1; }
        this.level = 1;
        this.quality = 1;
        this.level = level;
        this.quality = quality;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "atk"
        ,function () {
            return this.level * 0.5 + this.quality * 2.4;
        }
    );
    d(p, "def"
        ,function () {
            return this.level + this.quality * 0.4;
        }
    );
    d(p, "powerPoint"
        ,function () {
            return this.level * 2 + this.quality * 4;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
/**武将装备的技能，三级 */
var Skill = (function () {
    function Skill(scroll) {
        this.level = 1;
        if (scroll)
            this.scroll = scroll;
    }
    var d = __define,c=Skill,p=c.prototype;
    p.levelup = function () {
        this.level++;
    };
    d(p, "atk"
        ,function () {
            var result = 0;
            if (this.scroll)
                result += this.scroll.atk;
            return this.level * 5 + result;
        }
    );
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            if (this.scroll)
                result += this.scroll.powerPoint;
            return this.level * 8 + result;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" power " + this.powerPoint);
    };
    return Skill;
}());
egret.registerClass(Skill,'Skill');
/**
 * 技能装备的秘籍，四级
 */
var Scroll = (function () {
    function Scroll(quality, level) {
        if (quality === void 0) { quality = 1; }
        if (level === void 0) { level = 1; }
        this.quality = 1;
        this.level = 1;
        this.quality = quality;
        this.level = level;
    }
    var d = __define,c=Scroll,p=c.prototype;
    d(p, "atk"
        ,function () {
            return this.level * this.quality * 1.2;
        }
    );
    d(p, "def"
        ,function () {
            return this.level * this.quality * 0.3;
        }
    );
    d(p, "powerPoint"
        ,function () {
            return this.level * 2 + this.quality * 5;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Scroll;
}());
egret.registerClass(Scroll,'Scroll');
var Cache = function (target, propertyName, desc) {
    var getter = desc.get;
    desc.get = function () {
        console.log("wow");
        return getter.apply(this);
    };
    return desc;
};
//# sourceMappingURL=User.js.map