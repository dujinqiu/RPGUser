
let logger = (target: any, name: string, descriptor: PropertyDescriptor) => {
    let delegate = descriptor.value;
    descriptor.value = function () {
        let args: string[] = [];
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        console.log(`${name} in: ${args.join()}`);
        let result = delegate.apply(this, arguments);
        console.log(`${name} out: ${result}`);
        return result;
    }
    return descriptor;
}

/**用户，一级 */
class User {
    heroes: Hero[] = [];
    private title: Title;

    get heroesInTeam():Hero[]{
        return this.heroes.filter( (value:Hero) => {
            return (value.inParty);
        })
    }

    changeTitle(title:Title){
        this.title = title;
        if(this.heroes){
            this.heroes.forEach((value:Hero) => {
                value.title = title;
            });
        }
    }

    get powerPoint():number{
        var result = 0;
        var heroes = this.heroesInTeam;
        if(heroes){
            heroes.forEach((value:Hero) => {
                result += value.powerPoint;
            });
        }
        if(this.title)
            result += this.title.powerPoint;
        return result;
    }

}

/**英雄，二级 */
class Hero {
    quality = 1;
    level = 1;
    inParty = false;
    equipment: Equipment[] = [];
    title: Title;
    skill: Skill[] = [];


    constructor(level = 1, quality = 1) {
        this.title = new Title();
        this.inParty = false;
    }

    
    @logger
    addEquip(equip: Equipment) {
        this.equipment.push(equip);
    }


    removeEquip(equip: Equipment) {
        var index = this.equipment.indexOf(equip);
        this.equipment.slice(index, 1);
    }

    addSkill(skill: Skill) {
        this.skill.push(skill);
    }

    removeSkill(skill: Skill) {
        var index = this.skill.indexOf(skill);
        this.skill.slice(index, 1);
    }

    get atk(): number {
        var result = 50 * this.quality * this.level;
        this.equipment.forEach((value) => { result += value.def });
        result += this.title.def;
        return result;
    }

    get def(): number {
        var result = 50 * this.quality * this.level;
        this.skill.forEach((value) => { result += value.atk; });
        this.equipment.forEach((value) => { result += value.atk });
        result += this.title.atk;
        return result;
    }

    get powerPoint():number {
        var result = 0;
        if(this.equipment){
            this.equipment.forEach((value) => { result += value.powerPoint });
        }
        if(this.title)
            result += this.title.powerPoint;
        if(this.skill){
            this.skill.forEach((value) => { result += value.powerPoint });
        }
        return result + this.quality * 28 + this.level * 5;
    }

    show():string{
        return ` level ${this.level},`+
        ` quality ${this.quality} power ${this.powerPoint}`;
    }
}
/**称号，二级 */
class Title {
    quality = 1;
    consturctor(quality = 1) {
        this.quality = quality;
    }
    get atk(): number {
        return this.quality * 6.5;
    }

    get def(): number {
        return this.quality * 4.5;
    }

    get powerPoint(): number {
        return this.quality * 5;
    }

    show():string{
        return ` `+
        ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

/**装备，三级 */
class Equipment {
    quality = 1;
    jewelery: Jewel[] = [];

    constructor(quality = 1, jewelery?: Jewel[]) {
        this.quality = quality;
        if(jewelery)
            this.jewelery = jewelery;
    }

    addJewelery(jewelery:Jewel[]){
        this.jewelery = this.jewelery.concat(jewelery);
    }
    get atk(): number {
        var result = 0;
        if (this.jewelery)
            this.jewelery.forEach((value, index, array) => { result += value.atk; });
        return this.quality * 5.5 + result;
    }

    get def(): number {
        var result = 0;
        if (this.jewelery)
            this.jewelery.forEach((value, index, array) => { result += value.atk; });
        return this.quality * 1.5 + result;
    }

    get powerPoint(): number {
        var result = 0;
        if(this.jewelery)
            this.jewelery.forEach((value:Jewel) => { result += value.powerPoint;});
        return result + this.quality * 5;
    }

    show():string{
        return ` `+
        ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

/**宝石，四级 */
class Jewel {
    level = 1;
    quality = 1;

    constructor(quality: number = 1, level: number = 1) {
        this.level = level;
        this.quality = quality;
    }

    get atk(): number {
        return this.level * 0.5 + this.quality * 2.4;
    }

    get def(): number {
        return this.level + this.quality * 0.4;
    }

    get powerPoint(): number {
        return this.level * 2 + this.quality * 4;
    }

    show():string{
        return ` level ${this.level},`+
        ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

/**武将装备的技能，三级 */
class Skill {
    level = 1;
    scroll: Scroll;

    constructor(scroll?: Scroll) {
        if(scroll)
            this.scroll = scroll;
    }

    levelup(): void {
        this.level++;
    }
    get atk(): number {
        var result = 0;
        if(this.scroll)
            result += this.scroll.atk;
        return this.level * 5 + result;
    }
    get powerPoint(): number {
        var result = 0;
        if(this.scroll)
            result += this.scroll.powerPoint;
        return this.level * 8 + result;
    }

    show():string{
        return ` level ${this.level},`+
        ` power ${this.powerPoint}`;
    }
}

/**
 * 技能装备的秘籍，四级
 */
class Scroll {
    quality = 1;
    level = 1;
    constructor(quality: number = 1, level: number = 1) {
        this.quality = quality;
        this.level = level;
    }
    get atk(): number {
        return this.level * this.quality * 1.2;
    }

    get def(): number {
        return this.level * this.quality * 0.3;
    }
    get powerPoint(): number {
        return this.level * 2 + this.quality * 5;
    }

    show():string{
        return ` level ${this.level},`+
        ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function () {
        console.log("wow");
        return getter.apply(this);
    }
    return desc;
}




