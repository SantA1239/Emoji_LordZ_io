(() => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
  
    ctx.imageSmoothingEnabled = true;
  
    const WORLD_RADIUS = 48000; // Рассчитано как диаметр в 1000 башен (размер ~96)
  
    // --- ДОБАВЛЕНО: Система перевода ---
    const translations = {
      ru: {
          // --- Общие ---
          game_title: "EmojiLordz.io", offline_button: "Оффлайн", online_button_wip: "Онлайн (в разработке)", settings_button: "Настройки", exit_button: "Выход", language_title: "Выберите язык", back_button: "Назад", leaderboard_title: "Лидеры 💰", troop_count_label: "Войска",
          delete_troop_title: "Выберите войско, которое хотите удалить из своей армии, золото вам не вернут",
          // --- Уведомления ---
          notification_no_gold: "Недостаточно золота",
          notification_troop_limit: "Недостаточно лимита войска",
          notification_building_limit: "Достигнут лимит зданий",
          notification_tombstone_needed: "Для него нужно надгробие",
          notification_tombstone_silver: "Нужно надгробие <span style='color: silver; font-weight: bold;'>СЕРЕБРЯНОГО</span> уровня",
          notification_tombstone_gold: "Нужно надгробие <span style='color: gold; font-weight: bold;'>ЗОЛОТОГО</span> уровня",
          notification_tombstone_max: "Нужно надгробие <span style='color: #ff4d4d; font-weight: bold;'>МАКСИМАЛЬНОГО</span> уровня 🗻",
          notification_no_troops_to_delete: "У вас нет войск для удаления.",
          // --- Подсказки к кнопкам ---
          tooltip_attack_mode: "❗ - В этом режиме ваши войска превращается в берсерков, они будут следовать уже не за вами, а рваться вперёд!",
          tooltip_defense_mode: "❣️ - В этом режиме, ваши войска становиться дружелюбными, никого не атакуют и восстанавливают себе 1хп каждые 10 секунд, но это не спасает из от получения урона вражескими войсками (лорд в этом режиме восстанавливает 10хп каждые 3 секунды)",
          tooltip_hold_mode: "💤 - В этом режиме войска останавливаться на позиции и обороняют её, да они могут атаковать! А также собирать золото около статуй... Но я вам этого не говорил",
          tooltip_give_gold: "💰 - Нет, вы не берёте кредит, вы отдаете золото или просто кладете его как тайничок",
          tooltip_switch_profession: "🔁 - Меняет вашу профессию, теперь вы не лорд... Вы строитель, вы архитектор",
          tooltip_bestiary: "📖 - Открывает вам путь в ваш личный бестиарий... Я называю это \"Военный Гербарий\"",
          tooltip_minimap_toggle: "🍾 - Закрывает миникарту, а на ней вообще-то много чего полезного!",
          tooltip_leaderboard_toggle: "🚫 - Вам не интересны лидеры... Вы играете в удовольствие",
          tooltip_delete_troop: "🚮 - Эти войска приносят разочарование... Надо из сократить!",
          // --- Настройки ---
          settings_title: "Настройки", language_button: "Язык", joystick_pos_left: "Джойстик: слева", joystick_pos_right: "Джойстик: справа",
          // --- Статистика ---
          stat_level: "Уровень", stat_health: "Прочность", stat_damage: "Урон", stat_attack_speed: "Скорость атаки", stat_radius: "Радиус", stat_sell: "Продажа", stat_repair: "Починка", stat_upgrade: "Улучшение", stat_cost: "Стоимость", stat_slots: "Место", stat_attack_effect: "Эффект атаки", troop_damage_long: "Урон (Войска/Здания/Лорд)",
          // --- Названия юнитов ---
          unit_name_monkey: "Обезьянка", unit_name_monkeyBomb: "Обезьянка с бомбой", unit_name_monkeyArcher: "Обезьяна с луком", unit_name_monkeyWithSword: "Обезьяна с мечом", unit_name_ram: "Таран", unit_name_skeleton: "Скелетик", unit_name_ghost: "Призрак", unit_name_bat: "Летучие мыши", unit_name_coffin: "Гроб", unit_name_vampire: "Вампир", unit_name_dragon: "Дракон", unit_name_demon: "Демон", unit_name_goldenSkeleton: "Золотой скелетик", unit_name_cursedCoffin: "Проклятый Гроб", unit_name_hugeBat: "Огромная Летучая Мышь", unit_name_trueDragon: "Истинный дракон", unit_name_trueDemon: "Истинный демон",
          unit_name_zombieLeader: "Зомби-вожатый", unit_name_zombieFollower: "Зомби-приспешник",
          // --- Описания юнитов ---
          unit_desc_monkey: "Боевая единица на старте, ничего особенного из себя не представляет, мне кажется я хотел война... А не удобрение за 50 монет.",
          unit_desc_monkeyBomb: "Как только его хп достигнет 10 или меньше, оставляет после себя бомбу, что по истечению таймера взрывает в округе врагов, нанося 300 урона по войскам, 150 зданиям и 50 лордам. Если выжил, превращается в удобрение за 50 монет.",
          unit_desc_monkeyArcher: "У меня много вопросов, но я знаю точно одно, наносит интересный урон стрелами (30 по войскам, 3 по зданиям, 6 по лорду). Ну я думаю штукатурку повредит башне.",
          unit_desc_monkeyWithSword: "Он интроверт, наносит приличный урон мечом (70/7/35), если не касается телом врага. Он очень брезглив и получает эмоциональный урон от прикосновения... Не любит участвовать в толпе.",
          unit_desc_ram: "Это бревно несут две обезьянки, нанося существенный урон зданиям. Будут долбить, пока не сломается бревно, потом пойдут в атаку сами.",
          unit_desc_skeleton: "Дешевый боец... Три удара и обратно в анатомический музей несите его.",
          unit_desc_ghost: "Игнорирует любой урон, кроме своего же. Каждую секунду теряет 5хп, и крики, слезы, не остановят его самоуничтожение, только кнопка '❣️' может его сохранить...",
          unit_desc_bat: "Боец... Один из тех, кто не умирает от собственных же атак... Это достойно.",
          unit_desc_coffin: "Деревянная коробка, почти как киндер сюрприз, что спавнит двух скелетов после того, как её хп достигнет 25 или ниже.",
          unit_desc_vampire: "Ох уж его сосущая аура, за каждую вражескую единицу будет получать... Единицу здоровья и наносить урон в радиусе (5 войскам, 1 зданиям, 3 лордам).",
          unit_desc_dragon: "Не надо сравнивать его языки пламени с золотым дождиком, это его сильно оскорбляет.",
          unit_desc_demon: "Просто прыгает... И наносит хороший урон в радиусе, не получая урон от стрел.",
          unit_desc_goldenSkeleton: "Всё тот же скелетик, но теперь в золоте. Позолота за наш счет, главное не спрашивайте откуда.",
          unit_desc_cursedCoffin: "Этот гроб выпускает много золотых скелетиков... Что-то на богатом, кстати, зубы... Мы заметили, мы всё видели.",
          unit_desc_hugeBat: "Вроде... Не такая и большая... Да? Если её хп достигнет 300/300, она не будет терять ярость.",
          unit_desc_trueDragon: "Вот это да... Вот это да, средневековый огнемёт прям.",
          unit_desc_trueDemon: "Вот он боссфайт... Я не знаю как его останавливать. Неуязвим к стрелам.",
          unit_desc_zombieLeader: "Знали, что зомби распространяют свой вирус пачкованием?",
          // --- Названия зданий ---
          building_name_tower: "Башня", building_name_magicTower: "Волшебная Башня", building_name_house: "Дом", building_name_tombstone: "Надгробие",
          // --- Описания зданий ---
          building_desc_tower: "Стреляет по врагам одиночными снарядами.",
          building_desc_magicTower: "Наносит урон по площади.",
          building_desc_house: "Увеличивает лимит войск.",
          building_desc_tombstone: "Открывает доступ к особым существам.",
          stat_max_level: "Макс.",
          // --- НОВЫЕ ПЕРЕВОДЫ ДЛЯ ФУНКЦИОНАЛА ИМЕНИ, СКИНОВ, КОДОВ ---
          name_button: "Имя",
          name_title: "Введите ваше имя",
          save_button: "Сохранить",
          skins_button: "Скины",
          skins_title: "Скины",
          locked_for_code: "за код",
          codes_button: "Коды",
          codes_title: "Коды",
          submit_code_button: "Применить",
          code_unlocked: "Скин 'Дерево' разблокирован!",
          code_invalid: "Неверный код",
          placeholder_enter_code: "Введите код",
          // --- Экран поражения ---
          death_screen_title: "Вас Уничтожили",
          restart_button: "Начать заново",
      },
      en: {
          // --- General ---
          game_title: "EmojiLordz.io", offline_button: "Offline", online_button_wip: "Online (in development)", settings_button: "Settings", exit_button: "Exit", language_title: "Select language", back_button: "Back", leaderboard_title: "Leaders 💰", troop_count_label: "Troops",
          delete_troop_title: "Select a troop to remove from your army, gold will not be refunded",
          // --- Notifications ---
          notification_no_gold: "Not enough gold",
          notification_troop_limit: "Troop limit reached",
          notification_building_limit: "Building limit reached",
          notification_tombstone_needed: "Requires a Tombstone",
          notification_tombstone_silver: "Requires a <span style='color: silver; font-weight: bold;'>SILVER</span> level Tombstone",
          notification_tombstone_gold: "Requires a <span style='color: gold; font-weight: bold;'>GOLD</span> level Tombstone",
          notification_tombstone_max: "Requires a <span style='color: #ff4d4d; font-weight: bold;'>MAX</span> level Tombstone 🗻",
          notification_no_troops_to_delete: "You have no troops to delete.",
          // --- Button Tooltips ---
          tooltip_attack_mode: "❗ - In this mode, your troops turn into berserkers; they will no longer follow you but will rush forward!",
          tooltip_defense_mode: "❣️ - In this mode, your troops become friendly, do not attack anyone, and restore 1 HP every 10 seconds, but this does not save them from taking damage from enemy troops (the lord in this mode restores 10 HP every 3 seconds).",
          tooltip_hold_mode: "💤 - In this mode, troops hold their position and defend it. Yes, they can attack! They can also collect gold near statues... But I didn't tell you that.",
          tooltip_give_gold: "💰 - No, you are not taking a loan; you are giving away gold or simply placing it as a stash.",
          tooltip_switch_profession: "🔁 - Changes your profession. Now you are not a lord... You are a builder, you are an architect.",
          tooltip_bestiary: "📖 - Opens the way to your personal bestiary... I call it the \"Military Herbarium.\"",
          tooltip_minimap_toggle: "🍾 - Closes the minimap, which actually has a lot of useful things on it!",
          tooltip_leaderboard_toggle: "🚫 - You are not interested in leaders... You play for pleasure.",
          tooltip_delete_troop: "🚮 - These troops are disappointing... They need to be cut!",
          // --- Settings ---
          settings_title: "Settings", language_button: "Language", joystick_pos_left: "Joystick: left", joystick_pos_right: "Joystick: right",
          // --- Stats ---
          stat_level: "Level", stat_health: "Durability", stat_damage: "Damage", stat_attack_speed: "Attack Speed", stat_radius: "Radius", stat_sell: "Sell", stat_repair: "Repair", stat_upgrade: "Upgrade", stat_cost: "Cost", stat_slots: "Space", stat_attack_effect: "Attack Effect", troop_damage_long: "Damage (Troops/Buildings/Lord)",
          // --- Unit Names ---
          unit_name_monkey: "Monkey", unit_name_monkeyBomb: "Monkey with a Bomb", unit_name_monkeyArcher: "Monkey with a Bow", unit_name_monkeyWithSword: "Monkey with a Sword", unit_name_ram: "Ram", unit_name_skeleton: "Skeleton", unit_name_ghost: "Ghost", unit_name_bat: "Bats", unit_name_coffin: "Coffin", unit_name_vampire: "Vampire", unit_name_dragon: "Dragon", unit_name_demon: "Demon", unit_name_goldenSkeleton: "Golden Skeleton", unit_name_cursedCoffin: "Cursed Coffin", unit_name_hugeBat: "Huge Bat", unit_name_trueDragon: "True Dragon", unit_name_trueDemon: "True Demon",
          unit_name_zombieLeader: "Zombie Leader", unit_name_zombieFollower: "Zombie Follower",
          // --- Unit Descriptions ---
          unit_desc_monkey: "A starting combat unit, nothing special. I think I wanted a warrior... Not fertilizer for 50 coins.",
          unit_desc_monkeyBomb: "Once its HP drops to 10 or less, it leaves a bomb that explodes after a timer, dealing 300 damage to troops, 150 to buildings, and 50 to lords. If it survives, it turns into fertilizer for 50 coins.",
          unit_desc_monkeyArcher: "I have many questions, but I know one thing for sure: it deals interesting damage with arrows (30 to troops, 3 to buildings, 6 to lords). I guess it can damage the tower's plaster.",
          unit_desc_monkeyWithSword: "He's an introvert, deals decent sword damage (70/7/35) if he doesn't touch the enemy's body. He is very fastidious and takes emotional damage from touch... Doesn't like to be in a crowd.",
          unit_desc_ram: "Two monkeys carry this log, dealing significant damage to buildings. They will keep hitting until the log breaks, then they will attack themselves.",
          unit_desc_skeleton: "A cheap fighter... Three hits and take it back to the anatomy museum.",
          unit_desc_ghost: "Ignores all damage except its own. Loses 5 HP every second, and cries and tears won't stop its self-destruction. Only the '❣️' button can save it...",
          unit_desc_bat: "A fighter... One of those who doesn't die from its own attacks... That's worthy.",
          unit_desc_coffin: "A wooden box, almost like a Kinder Surprise, that spawns two skeletons after its HP reaches 25 or below.",
          unit_desc_vampire: "Oh, its sucking aura... For each enemy unit, it will gain... one health and deal damage in a radius (5 to troops, 1 to buildings, 3 to lords).",
          unit_desc_dragon: "Don't compare its flames to a golden shower, it finds that very insulting.",
          unit_desc_demon: "Just jumps... and deals good area damage, while being immune to arrows.",
          unit_desc_goldenSkeleton: "Still the same skeleton, but now in gold. Gilding is on us, just don't ask where it's from.",
          unit_desc_cursedCoffin: "This coffin releases many golden skeletons... Something fancy. By the way, the teeth... We noticed, we saw everything.",
          unit_desc_hugeBat: "It seems... not that big... right? If its HP reaches 300/300, it won't lose rage.",
          unit_desc_trueDragon: "Wow... just wow, a real medieval flamethrower.",
          unit_desc_trueDemon: "Here's the boss fight... I don't know how to stop it. Immune to arrows.",
          unit_desc_zombieLeader: "Did you know that zombies spread their virus by budding?",
          // --- Building Names ---
          building_name_tower: "Tower", building_name_magicTower: "Magic Tower", building_name_house: "House", building_name_tombstone: "Tombstone",
          // --- Building Descriptions ---
          building_desc_tower: "Shoots single projectiles at enemies.",
          building_desc_magicTower: "Deals area of effect damage.",
          building_desc_house: "Increases troop limit.",
          building_desc_tombstone: "Unlocks special creatures.",
          stat_max_level: "Max.",
          // --- NEW TRANSLATIONS FOR NAME, SKINS, CODES ---
          name_button: "Name",
          name_title: "Enter your name",
          save_button: "Save",
          skins_button: "Skins",
          skins_title: "Skins",
          locked_for_code: "for code",
          codes_button: "Codes",
          codes_title: "Codes",
          submit_code_button: "Submit",
          code_unlocked: "Tree skin unlocked!",
          code_invalid: "Invalid code",
          placeholder_enter_code: "Enter code",
          // --- Death Screen ---
          death_screen_title: "You Have Been Destroyed",
          restart_button: "Start Over",
      },
      cn: {
          // --- 通用 ---
          game_title: "表情领主.io", offline_button: "离线模式", online_button_wip: "在线（开发中）", settings_button: "设置", exit_button: "退出", language_title: "选择语言", back_button: "返回", leaderboard_title: "排行榜 💰", troop_count_label: "部队",
          delete_troop_title: "选择要从军队中移除的单位，金币将不予退还",
          // --- 通知 ---
          notification_no_gold: "金币不足",
          notification_troop_limit: "部队已达上限",
          notification_building_limit: "建筑已达上限",
          notification_tombstone_needed: "需要墓碑",
          notification_tombstone_silver: "需要<span style='color: silver; font-weight: bold;'>白银</span>级墓碑",
          notification_tombstone_gold: "需要<span style='color: gold; font-weight: bold;'>黄金</span>级墓碑",
          notification_tombstone_max: "需要<span style='color: #ff4d4d; font-weight: bold;'>最高</span>级墓碑 🗻",
          notification_no_troops_to_delete: "您没有可删除的部队。",
          // --- 按钮提示 ---
          tooltip_attack_mode: "❗ - 在此模式下，您的部队会变成狂战士；他们将不再跟随您，而是向前冲锋！",
          tooltip_defense_mode: "❣️ - 在此模式下，您的部队会变得友好，不攻击任何人，并且每10秒恢复1点生命值，但这并不能使他们免受敌方部队的伤害（在此模式下，领主每3秒恢复10点生命值）。",
          tooltip_hold_mode: "💤 - 在此模式下，部队会坚守阵地并进行防御。是的，他们可以攻击！他们还可以在雕像附近收集金币……但我没告诉过你。",
          tooltip_give_gold: "💰 - 不，您不是在贷款；您是在赠送金币或只是将其作为藏匿处放置。",
          tooltip_switch_profession: "🔁 - 改变你的职业。现在你不再是领主……你是一名建造者，一名建筑师。",
          tooltip_bestiary: "📖 - 为您打开通往个人动物寓言集的路……我称之为“军事植物标本馆”。",
          tooltip_minimap_toggle: "🍾 - 关闭小地图，上面其实有很多有用的东西！",
          tooltip_leaderboard_toggle: "🚫 - 你对排行榜不感兴趣……你为了乐趣而玩。",
          tooltip_delete_troop: "🚮 - 这些部队令人失望……需要裁减！",
          // --- 设置 ---
          settings_title: "设置", language_button: "语言", joystick_pos_left: "操纵杆：左", joystick_pos_right: "操纵杆：右",
          // --- 统计数据 ---
          stat_level: "等级", stat_health: "耐久度", stat_damage: "伤害", stat_attack_speed: "攻击速度", stat_radius: "半径", stat_sell: "出售", stat_repair: "修理", stat_upgrade: "升级", stat_cost: "成本", stat_slots: "空间", stat_attack_effect: "攻击效果", troop_damage_long: "伤害 (部队/建筑/领主)",
          // --- 单位名称 ---
          unit_name_monkey: "猴子", unit_name_monkeyBomb: "炸弹猴", unit_name_monkeyArcher: "弓箭猴", unit_name_monkeyWithSword: "剑猴", unit_name_ram: "冲车", unit_name_skeleton: "骷髅", unit_name_ghost: "幽灵", unit_name_bat: "蝙蝠", unit_name_coffin: "棺材", unit_name_vampire: "吸血鬼", unit_name_dragon: "龙", unit_name_demon: "恶魔", unit_name_goldenSkeleton: "黄金骷髅", unit_name_cursedCoffin: "被诅咒的棺材", unit_name_hugeBat: "巨型蝙蝠", unit_name_trueDragon: "真龙", unit_name_trueDemon: "真恶魔",
          unit_name_zombieLeader: "僵尸领队", unit_name_zombieFollower: "僵尸随从",
          // --- 单位描述 ---
          unit_desc_monkey: "一个起始的战斗单位，没什么特别的。我想我想要的是一个战士...而不是花50金币买的肥料。",
          unit_desc_monkeyBomb: "当其生命值降至10或更低时，会留下一个炸弹，计时结束后爆炸，对部队造成300点伤害，对建筑造成150点伤害，对领主造成50点伤害。如果幸存下来，它会变成价值50金币的肥料。",
          unit_desc_monkeyArcher: "我有很多问题，但我确信一件事：它的箭能造成有趣的伤害（对部队30，对建筑3，对领主6）。我想它能损坏塔的灰泥。",
          unit_desc_monkeyWithSword: "他是个内向者，如果不接触敌人的身体，他的剑能造成可观的伤害（70/7/35）。他对接触非常挑剔，会受到情感伤害...不喜欢参与人群。",
          unit_desc_ram: "两只猴子抬着这根圆木，对建筑物造成巨大伤害。它们会一直撞，直到圆木断裂，然后它们自己去攻击。",
          unit_desc_skeleton: "一个廉价的战士...三下攻击就得送回解剖博物馆。",
          unit_desc_ghost: "忽略除自身之外的所有伤害。每秒失去5点生命值，哭喊和眼泪都无法阻止它的自我毁灭。只有“❣️”按钮可以拯救它...",
          unit_desc_bat: "一个战士...是少数不会死于自己攻击的单位之一...这值得称赞。",
          unit_desc_coffin: "一个木盒子，几乎像一个奇趣蛋，当它的生命值降至25或更低时，会产生两个骷髅。",
          unit_desc_vampire: "哦，它那吸取光环...范围内的每个敌方单位都会让它获得...一点生命值，并造成伤害（对部队5，对建筑1，对领主3）。",
          unit_desc_dragon: "不要把它的火焰与金雨相提并论，这会严重侮辱它。",
          unit_desc_demon: "只会跳...并造成不错的范围伤害，而且对箭矢免疫。",
          unit_desc_goldenSkeleton: "还是那个骷髅，但现在是金色的。镀金由我们承担，只要别问是从哪里来的。",
          unit_desc_cursedCoffin: "这个棺材会释放出许多黄金骷髅...有点奢侈。顺便说一下，那牙齿...我们注意到了，我们都看到了。",
          unit_desc_hugeBat: "看起来...不是那么大...对吧？如果它的生命值达到300/300，它将不会失去怒气。",
          unit_desc_trueDragon: "哇...简直是，一个真正的中世纪火焰喷射器。",
          unit_desc_trueDemon: "这就是首领战...我不知道该如何阻止他。对箭矢免疫。",
          unit_desc_zombieLeader: "你知道僵尸通过出芽的方式传播病毒吗？",
          // --- 建筑名称 ---
          building_name_tower: "塔", building_name_magicTower: "魔法塔", building_name_house: "房子", building_name_tombstone: "墓碑",
          // --- 建筑描述 ---
          building_desc_tower: "向敌人发射单个射弹。",
          building_desc_magicTower: "造成范围伤害。",
          building_desc_house: "增加部队上限。",
          building_desc_tombstone: "解锁特殊生物。",
          stat_max_level: "最高级",
          // --- 新增姓名、皮肤、代码功能的翻译 ---
          name_button: "姓名",
          name_title: "输入你的名字",
          save_button: "保存",
          skins_button: "皮肤",
          skins_title: "皮肤",
          locked_for_code: "需代码",
          codes_button: "代码",
          codes_title: "代码",
          submit_code_button: "提交",
          code_unlocked: "树皮肤已解锁！",
          code_invalid: "无效代码",
          placeholder_enter_code: "输入代码",
          // --- 失败界面 ---
          death_screen_title: "你被摧毁了",
          restart_button: "重新开始",
      }
    };
  
    let currentLanguage = 'ru';
  
    function setLanguage(lang) {
      currentLanguage = lang;
      const elementsWithContentKey = document.querySelectorAll('[data-translate-key-content]');
      elementsWithContentKey.forEach(el => {
          const key = el.getAttribute('data-translate-key-content');
          if (translations[lang][key]) {
              el.textContent = translations[lang][key];
          }
      });
  
      const elementsWithAriaKey = document.querySelectorAll('[data-translate-key-aria]');
      elementsWithAriaKey.forEach(el => {
          const key = el.getAttribute('data-translate-key-aria');
          if (translations[lang][key]) {
              el.setAttribute('aria-label', translations[lang][key]);
          }
      });
      
      const elementsWithKey = document.querySelectorAll('[data-translate-key]');
      elementsWithKey.forEach(el => {
          const key = el.getAttribute('data-translate-key');
          if (translations[lang][key]) {
              el.textContent = translations[lang][key];
          }
      });
      // Примечание: Динамический текст, такой как в инфо-панелях, потребует отдельной логики обновления внутри своих функций.
  
      // --- ДОБАВЛЕНО: Установка плейсхолдера для поля ввода кода ---
      const codeInputEl = document.getElementById('codeInput');
      if (codeInputEl && translations[lang] && translations[lang].placeholder_enter_code) {
          codeInputEl.placeholder = translations[lang].placeholder_enter_code;
      }
    }

  // --- ЗАГРУЗКА ИЗОБРАЖЕНИЙ ---
  // истиный демон
  const trueDemonImage = new Image();
  trueDemonImage.src = 'sprites/units/trueDemon.png'; 

  // Башня
  const towerTire0 = new Image();
  towerTire0.src = 'sprites/Towers/Towers/Tower0.png'; 
  const towerTire1 = new Image();
  towerTire1.src = 'sprites/Towers/Towers/Tower1.png'; 
  const towerTire2 = new Image();
  towerTire2.src = 'sprites/Towers/Towers/Tower2.png'; 
  const towerTire3 = new Image();
  towerTire3.src = 'sprites/Towers/Towers/Tower3.png'; 

  // Надгробие
  const TombStoneTire0 = new Image();
  TombStoneTire0.src = 'sprites/Towers/TombStones/TombStone0.png'
  const TombStoneTire1 = new Image();
  TombStoneTire1.src = 'sprites/Towers/TombStones/TombStone1.png'
  const TombStoneTire2 = new Image();
  TombStoneTire2.src = 'sprites/Towers/TombStones/TombStone2.png'
  const TombStoneTire3 = new Image();
  TombStoneTire3.src = 'sprites/Towers/TombStones/TombStone3.png'

  // Магические башни
  const MagicTower0 = new Image()
  MagicTower0.src = 'sprites/Towers/MagicTower/MagicTower0.png'
  const MagicTower1 = new Image()
  MagicTower1.src = 'sprites/Towers/MagicTower/MagicTower1.png'
  const MagicTower2 = new Image()
  MagicTower2.src = 'sprites/Towers/MagicTower/MagicTower2.png'
  const MagicTower3 = new Image()
  MagicTower3.src = 'sprites/Towers/MagicTower/MagicTower3.png'

  // Дома
  const House0 = new Image()
  House0.src = 'sprites/Towers/Houses/House0.png'
  const House1 = new Image()
  House1.src = 'sprites/Towers/Houses/House1.png'
  const House2 = new Image()
  House2.src = 'sprites/Towers/Houses/House2.png'
  const House3 = new Image()
  House3.src = 'sprites/Towers/Houses/House3.png'

  // Огромная летучая мышь
  const BigBatImage = new Image();
  BigBatImage.src = 'sprites/units/BigBat.png';

  // Летучая мышь
  const BatImage = new Image();
  BatImage.src = 'sprites/units/Bat.png';

  // Призрак
  const GhostImage = new Image();
  GhostImage.src = 'sprites/units/Ghost.png'

  // Гроб
  const CoffinImage1 = new Image();
  CoffinImage1.src = 'sprites/units/Coffin1.png';
  const CoffinImage2 = new Image();
  CoffinImage2.src = 'sprites/units/Coffin2.png';

  // Проклятый гроб
  const CursedCoffinImage1 = new Image();
  CursedCoffinImage1.src = 'sprites/units/CursedCoffin1.png';
  const CursedCoffinImage2 = new Image();
  CursedCoffinImage2.src = 'sprites/units/CursedCoffin2.png';

  // Лорды
  const LordImage1 = new Image();
  LordImage1.src = 'sprites/Lords/Lord1.png';
  const LordImage2 = new Image();
  LordImage2.src = 'sprites/Lords/Lord2.png';
  const LordImage3 = new Image();
  LordImage3.src = 'sprites/Lords/Lord3.png';
  const LordImage4 = new Image();
  LordImage4.src = 'sprites/Lords/Lord4.png';
  const LordImage5 = new Image();
  LordImage5.src = 'sprites/Lords/Lord5.png';
  
  const LordImage7 = new Image();
  LordImage7.src = 'sprites/Lords/Lord7.png';
  const LordImage8 = new Image();
  LordImage8.src = 'sprites/Lords/Lord8.png';

  // Уровни зданий
  const LevelSilverImage = new Image();
  LevelSilverImage.src = 'sprites/StarsLevel/LevelSilver.png'
  const LevelGoldImage = new Image();
  LevelGoldImage.src = 'sprites/StarsLevel/LevelGold.png'
  const LevelMaxImage = new Image();
  LevelMaxImage.src = 'sprites/StarsLevel/LevelMax.png'

  // Размер звезды уровня здания
  const sizeLevel_ = 25
  
    // --- Характеристики существ ---
      const CREATURE_STATS = {
      // --- НОВЫЕ СУЩЕСТВА ---
      zombieLeader: {
          type: 'zombieLeader',
          category: 'troop',
          maxHp: 70,
          hpLossOnAttack: 1,
          damage: { troop: 7, building: 7, lord: 7 },
          cost: 70,
          emoji: '🧟',
          size: 48,
          slotCost: 3,
          attackCooldownMax: 1000,
          maxRage: 5,
      },
      zombieFollower: {
          type: 'zombieFollower',
          category: 'troop',
          maxHp: 45,
          hpLossOnAttack: 5,
          damage: { troop: 5, building: 5, lord: 5 },
          cost: 0,
          emoji: '🧟‍♂️',
          size: 48,
          slotCost: 1,
          attackCooldownMax: 1500,
      },
      // --- ОБНОВЛЕННЫЕ СУЩЕСТВА С ВОЗВРАЩЕННЫМИ СПОСОБНОСТЯМИ ---
      goldenSkeleton: { // Золотой скелетик
          type: 'goldenSkeleton',
          category: 'troop',
          maxHp: 150,
          hpLossOnAttack: 5,
          damage: { building: 3, troop: 30, lord: 5 },
          cost: 10,
          emoji: '💀',
          size: 48,
          slotCost: 1,
      },
      cursedCoffin: { // Проклятый Гроб (бывший Живой Гроб)
          type: 'cursedCoffin',
          category: 'troop',
          maxHp: 2500,
          hpLossOnAttack: -100, // Лечится при атаке
          damage: { building: 30, troop: 50, lord: 30 },
          image: CursedCoffinImage1,
          cost: 5000,
          emoji: '⚰️',
          size: 150,
          slotCost: 50,
          attackCooldownMax: 2000,
          maxSpawnedSkeletons: 100,
      },
      aggressiveCursedCoffin: { // Агрессивная форма Проклятого Гроба
          type: 'aggressiveCursedCoffin',
          category: 'troop',
          maxHp: 2500,
          hpLossOnAttack: -100,
          damage: { building: 300, troop: 250, lord: 50 },
          cost: 5000,
          image: CursedCoffinImage2,
          emoji: '☠️',
          size: 150,
          slotCost: 50,
          attackCooldownMax: 1000,
          maxSpawnedSkeletons: 100,
      },
      hugeBat: { // Огромная летучая мышь (бывшая Супермышь)
          type: 'hugeBat',
          category: 'troop',
          maxHp: 300,
          damage: { troop: 10, building: 3, lord: 5 }, // Начальный урон
          cost: 250,
          image: BigBatImage,
          emoji: '🦇',
          size: 50, 
          slotCost: 3,
          baseHp: 150,
          attackCooldownMax: 500,
      },
      trueDragon: { // Истинный дракон (бывший Красный дракон)
          type: 'trueDragon',
          category: 'troop',
          maxHp: 1600,
          hpLossOnAttack: 0, 
          damage: { troop: 30, building: 10, lord: 15 }, 
          cost: 4500,
          emoji: '🐉',
          size: 112, 
          slotCost: 20,
          attackCooldownMax: 1000,
          fireTriangleRadius: 300,
          fireTriangleAngle: Math.PI / 4,
          fireballSpawnCooldownMax: 50, // выпускает 3 шара
          fireballDamage: { troop: 15, building: 5, lord: 10 },
          fireballSpeed: 8,
      },
      trueDemon: { // Истинный демон (бывший Супердемон)
        type: 'trueDemon',
        category: 'troop',
        maxHp: 100000,
        baseHp: 100000,
        hpLossOnAttack: -335,
        damage: { building: 335, troop: 335, lord: 335 },
        damageInner: { building: 550, troop: 1000, lord: 500 },
        cost: 33500,
        image: trueDemonImage, // <-- ВОТ ИЗМЕНЕНИЕ
        emoji: '🐏', // эмодзи оставим для интерфейса
        slotCost: 100,
        attackRadius: 185,
        attackRadiusInner: 115,
        aoeDuration: 300,
        attackCooldownMax: 3000,
        maxCount: 3,
        size: 224,
        traits: ['AntiBow'],
    },
      // --- ОСТАЛЬНЫЕ СУЩЕСТВА ---
      monkey: {
        type: 'monkey',
        category: 'troop',
        maxHp: 80,
        hpLossOnAttack: 10,
        damage: { troop: 10, building: 3, lord: 5 },
        cost: 50,
        emoji: '🐵',
        slotCost: 3,
      },
      monkeyBomb: {
        type: 'monkeyBomb',
        category: 'troop',
        maxHp: 15,
        hpLossOnAttack: 3,
        damage: { troop: 1, building: 1, lord: 1 },
        cost: 100,
        emoji: '🐵💣',
        slotCost: 5,
        abilityTriggered: false,
      },
      monkeyArcher: {
        type: 'monkeyArcher',
        category: 'troop',
        maxHp: 60,
        cost: 175,
        emoji: '🐵',
        slotCost: 6,
        hpLossOnAttack: 0,
        damage: { troop: 10, building: 3, lord: 5 },
        bowDamage: { troop: 30, building: 3, lord: 6 },
        attackCooldownMax: 1500,
        traits: ['Bow'],
      },
      monkeyWithSword: {
        type: 'monkeyWithSword',
        category: 'troop',
        maxHp: 80,
        hpLossOnAttack: 10,
        damage: { troop: 10, building: 3, lord: 5 },
        swordDamage: { troop: 70, building: 7, lord: 35 },
        cost: 100,
        emoji: '🐵',
        slotCost: 7,
        attackCooldownMax: 1000,
        swordAttackCooldownMax: 700,
      },
      ram: {
        type: 'ram',
        category: 'troop',
        maxHp: 150,
        hpLossOnAttack: 50,
        damage: { troop: 30, building: 200, lord: 15 },
        cost: 200,
        emoji: '🪵',
        slotCost: 8,
        attackCooldownMax: 1000,
        abilityTriggered: false,
      },
       skeleton: {
        type: 'skeleton',
        category: 'troop',
        maxHp: 30,
        hpLossOnAttack: 10,
        damage: { building: 3, troop: 10, lord: 5 },
        cost: 10,
        emoji: '💀',
        slotCost: 1,
      },
      ghost: {
        type: 'ghost',
        category: 'troop',
        maxHp: 100,
        hpLossOnAttack: 0,
        damage: { troop: 15, building: 3, lord: 10 },
        cost: 200,
        image: GhostImage,
        emoji: '👻',
        slotCost: 3,
        attackCooldownMax: 1000,
        traits: ['immuneToDamage'],
        opacity: 0.75,
      },
      bat: {
        type: 'bat',
        category: 'troop',
        maxHp: 150,
        hpLossOnAttack: -3,
        damage: { troop: 3, building: 1, lord: 5 },
        cost: 150,
        size: 50,
        image: BatImage,
        emoji: '🦇',
        slotCost: 1,
        baseHp: 30,
        attackCooldownMax: 700,
      },
      coffin: {
        type: 'coffin',
        category: 'troop',
        maxHp: 80,
        hpLossOnAttack: 1,
        damage: { troop: 5, building: 3, lord: 3 },
        cost: 50,
        image: CoffinImage1,
        size: 80,
        emoji: '⚰️',
        slotCost: 7,
        abilityTriggered: false,
      },
      vampire: {
        type: 'vampire',
        category: 'troop',
        maxHp: 270,
        baseHp: 200,
        hpLossOnAttack: -3,
        damage: { troop: 15, building: 3, lord: 5 },
        cost: 175,
        emoji: '🧛',
        slotCost: 5,
        attackCooldownMax: 700,
        auraRadius: 80,
        auraDamage: { troop: 5, building: 1, lord: 3 },
        auraHeal: 1,
      },
      dragon: {
        type: 'dragon',
        category: 'troop',
        maxHp: 850,
        hpLossOnAttack: 0,
        damage: { troop: 30, building: 10, lord: 15 },
        cost: 1500,
        emoji: '🐲',
        size: 112,
        slotCost: 15,
        attackCooldownMax: 1000,
        fireTriangleRadius: 300,
        fireTriangleAngle: Math.PI / 4,
        fireballSpawnCooldownMax: 100,
        fireballDamage: { troop: 3, building: 1, lord: 1 },
        fireballSpeed: 8,
      },
      demon: {
        type: 'demon',
        category: 'troop',
        maxHp: 1200,
        damage: { building: 130, troop: 260, lord: 100 },
        cost: 3000,
        emoji: '👹',
        slotCost: 10,
        attackRadius: 100,
        aoeDuration: 300,
        size: 160,
        attackCooldownMax: 3000,
        traits: ['AntiBow'],
      },
      // --- СЛУЖЕБНЫЕ И ВТОРИЧНЫЕ СУЩЕСТВА ---
      grawSkeleton: {
        category: 'troop',
        maxHp: 30,
        hpLossOnAttack: 10,
        damage: { building: 3, troop: 10, lord: 5 },
        cost: 0,
        emoji: '💀',
        slotCost: 0,
      },
      goldenSkeletonFromCoffin: { // Золотой скелетик от Проклятого Гроба
          category: 'troop',
          maxHp: 150,
          hpLossOnAttack: 5,
          damage: { building: 3, troop: 30, lord: 5 },
          cost: 0, // Бесплатный
          emoji: '💀',
          size: 48,
          slotCost: 0, // Не занимает места
      },
      bomb: {
        category: 'bomb',
        maxHp: 10000,
        damage: { troop: 300, building: 150, lord: 50 },
        cost: 0,
        emoji: '💣',
        slotCost: 0,
        explosionRadius: 80,
        explosionDuration: 3000,
        team: null,
      },
      // --- ЛОРДЫ ---
      lord: {
        category: 'lord',
        maxHp: 300,
        damage: { troop: 10, building: 1, lord: 50 },
        cost: 0,
        image: LordImage1,
        emoji: '👑',
        slotCost: 0,
      },
      bot: {
        category: 'lord',
        maxHp: 300,
        damage: { troop: 10, building: 1, lord: 50 },
        cost: 0,
        emoji: '🤖',
        slotCost: 0,
      },
      // --- ЗДАНИЯ ---



      tower: {
          category: 'building',
          maxCount: 75,
          size: 170, width: 170, height: 170,
          hitboxRadius: 45,
          slotCost: 0,
          levels: [
              { level: 0, cost: 750, image: towerTire0, repairCost: 350, emoji: '🏰', maxHp: 500, damage: { troop: 12, building: 12, lord: 12 }, attackSpeed: 1500, attackRadius: 200, upgradeCost: 1500 },
              { level: 1, cost: 2250, image: towerTire1, emoji: '🥫', levelEmoji: '✨', imageLevel: LevelSilverImage, sizeLevel: sizeLevel_, repairCost: 750, maxHp: 1000, damage: { troop: 24, building: 24, lord: 24 }, attackSpeed: 1500, attackRadius: 300, upgradeCost: 3000 },
              { level: 2, cost: 5250, image: towerTire2, emoji: '🫙', levelEmoji: '⭐', imageLevel: LevelGoldImage, sizeLevel: sizeLevel_,repairCost: 1500, maxHp: 3000, damage: { troop: 50, building: 50, lord: 50 }, attackSpeed: 1500, attackRadius: 600, upgradeCost: 6000 },
              { level: 3, cost: 11250, image: towerTire3, emoji: '🛢️', levelEmoji: '🌟', imageLevel: LevelMaxImage, sizeLevel: sizeLevel_, repairCost: 3000, maxHp: 6000, damage: { troop: 100, building: 100, lord: 100 }, attackSpeed: 1000, attackRadius: 600, upgradeCost: null }
          ]
      },
      magicTower: {
          category: 'building',
          maxCount: 25,
          size: 96, width: 96, height: 96,
          hitboxRadius: 50,
          slotCost: 0,
          levels: [
              { level: 0, cost: 1000, repairCost: 500, emoji: '🏛️', image: MagicTower0, maxHp: 600, damage: 6, attackSpeed: 1750, attackRadius: 200, aoeRadius: 35, aoeDuration: 700, upgradeCost: 2000 },
              { level: 1, cost: 3000, emoji: '🏦', image: MagicTower1, levelEmoji: '✨', imageLevel: LevelSilverImage, sizeLevel: sizeLevel_, repairCost: 1000, maxHp: 1200, damage: 12, attackSpeed: 1750, attackRadius: 300, aoeRadius: 50, aoeDuration: 700, upgradeCost: 4000 },
              { level: 2, cost: 7000, emoji: '🏨', image: MagicTower2, levelEmoji: '⭐', imageLevel: LevelGoldImage, sizeLevel: sizeLevel_, repairCost: 2000, maxHp: 2400, damage: 24, attackSpeed: 1750, attackRadius: 600, aoeRadius: 65, aoeDuration: 700, upgradeCost: 8000 },
              { level: 3, cost: 15000, emoji: '🕍', image: MagicTower3, levelEmoji: '🌟', imageLevel: LevelMaxImage, sizeLevel: sizeLevel_, repairCost: 3500, maxHp: 5000, damage: 50, attackSpeed: 1500, attackRadius: 600, aoeRadius: 80, aoeDuration: 700, upgradeCost: null }
          ]
      },
      house: {
          category: 'building',
          maxCount: 10,
          size: 64, width: 64, height: 64,
          hitboxRadius: 35,
          slotCost: 0,
          levels: [
              { level: 0, cost: 100, repairCost: 75, emoji: '🏚️', image: House0, maxHp: 200, troopSlotsIncrease: 10, upgradeCost: 250 },
              { level: 1, emoji: '🏠', levelEmoji: '✨', image: House1, imageLevel: LevelSilverImage, sizeLevel: sizeLevel_, repairCost: 150, maxHp: 400, troopSlotsIncrease: 15, upgradeCost: 500 },
              { level: 2, emoji: '🏡', levelEmoji: '⭐', image: House2, imageLevel: LevelGoldImage, sizeLevel: sizeLevel_, repairCost: 450, maxHp: 800, troopSlotsIncrease: 25, upgradeCost: 1000 },
              { level: 3, emoji: '🏘️', levelEmoji: '🌟', image: House3, imageLevel: LevelMaxImage, sizeLevel: sizeLevel_, repairCost: 750, maxHp: 1600, troopSlotsIncrease: 50, upgradeCost: null }
          ]
      },
      tombstone: {
          category: 'building',
          maxCount: 1,
          size: 72, width: 72, height: 72,
          hitboxRadius: 30,
          slotCost: 0,
          levels: [
              { level: 0, cost: 150, repairCost: 15, emoji: '🪦', image: TombStoneTire0, maxHp: 130, upgradeCost: 50, allows: ['skeleton', 'zombieLeader'] },
              { level: 1, emoji: '⛄', image: TombStoneTire1, levelEmoji: '✨', imageLevel: LevelSilverImage, sizeLevel: sizeLevel_, repairCost: 25, maxHp: 260, upgradeCost: 50, allows: ['skeleton', 'zombieLeader', 'bat', 'ghost'] },
              { level: 2, emoji: '☃️', image: TombStoneTire2, levelEmoji: '⭐', imageLevel: LevelGoldImage, sizeLevel: sizeLevel_, repairCost: 50, maxHp: 520, upgradeCost: 5750, allows: ['skeleton', 'zombieLeader', 'bat', 'coffin', 'vampire', 'ghost'] },
              { level: 3, emoji: '🗻', image: TombStoneTire3, levelEmoji: '🌟', imageLevel: LevelMaxImage, sizeLevel: sizeLevel_, repairCost: 100, maxHp: 1050, upgradeCost: null, allows: ['skeleton', 'zombieLeader', 'bat', 'coffin', 'vampire', 'ghost', 'hugeBat', 'goldenSkeleton', 'cursedCoffin'] }
          ]
      },
      // --- ОБЪЕКТЫ ---
      statue: {
          category: 'object',
          emoji: '🗿',
          size: 80,
          hitboxRadius: 40,
          coinSpawnRadius: 150,
          maxCoins: 15,
          spawnCooldown: 1000,
      },
      statueLiberty: {
          category: 'object',
          emoji: '🗽',
          size: 96,
          hitboxRadius: 45,
          coinSpawnRadius: 200,
          maxCoins: 100,
          spawnCooldown: 1000,
      }
    };
  
    // --- НОВЫЕ КОНСТАНТЫ ДЛЯ ОПТИМИЗАЦИИ И ГРАНИЦ ---
    const PROCESSING_RADIUS = 4000; // УВЕЛИЧЕНО: Радиус обработки объектов вокруг игрока
    const WORLD_BORDER_WIDTH = 5000; // Ширина черных границ мира
  
    // --- НОВАЯ ФУНКЦИЯ: Отрисовка границ мира ---
    function drawWorldBoundaries(cameraX, cameraY, scale) {
      ctx.fillStyle = 'black';
      const worldEdge = WORLD_RADIUS;
      const worldDiameter = WORLD_RADIUS * 2;
  
      // Рассчитываем видимые на экране координаты и размеры
      const screenLeftEdge = canvas.width / 2 + (-worldEdge - cameraX) * scale;
      const screenTopEdge = canvas.height / 2 + (-worldEdge - cameraY) * scale;
      const screenBoundaryWidth = WORLD_BORDER_WIDTH * scale;
      const screenWorldDiameter = worldDiameter * scale;
      
      // Верхняя граница
      ctx.fillRect(screenLeftEdge, screenTopEdge, screenWorldDiameter, screenBoundaryWidth);
      // Нижняя граница
      ctx.fillRect(screenLeftEdge, screenTopEdge + screenWorldDiameter - screenBoundaryWidth, screenWorldDiameter, screenBoundaryWidth);
      // Левая граница
      ctx.fillRect(screenLeftEdge, screenTopEdge, screenBoundaryWidth, screenWorldDiameter);
      // Правая граница
      ctx.fillRect(screenLeftEdge + screenWorldDiameter - screenBoundaryWidth, screenTopEdge, screenBoundaryWidth, screenWorldDiameter);
    }
  
  
 
  
    // --- Игрок ---

       // --- НОВЫЕ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ ИМЕНИ И СКИНОВ ---

    // ✅ Создаем объект, который связывает эмодзи скина с его изображением.
    // Это нужно, чтобы игра знала, какую картинку-текстуру загружать для выбранного скина.
    const lordSkinImages = {
        "👑": LordImage1,
        "🫅": LordImage2,
        "🫅🏻": LordImage3,
        "🫅🏼": LordImage4,
        "🫅🏽": LordImage5,
        "🫅🏾": null, // У этого скина нет специальной текстуры, будет использоваться эмодзи.
        "🫅🏿": LordImage7,
        "🌳": LordImage8, 
    };

    let playerName = localStorage.getItem('playerName') || 'Player';
    const availableSkins = ["👑", "🫅", "🫅🏻", "🫅🏼", "🫅🏽", "🫅🏾", "🫅🏿", "🌳"];
    const defaultUnlockedSkins = ["👑", "🫅", "🫅🏻", "🫅🏼", "🫅🏽", "🫅🏾", "🫅🏿"];
    let unlockedSkins = new Set(JSON.parse(localStorage.getItem('unlockedSkins')) || defaultUnlockedSkins);
    let playerSkin = localStorage.getItem('playerSkin') || '👑';
  
    // --- Игрок ---
    const lord = {
        id: 'player',
        name: playerName, 
        emoji: playerSkin,
        // ✅ При запуске игры устанавливаем правильное изображение для лорда,
        // основываясь на скине, сохраненном в памяти (localStorage).
        // Раньше здесь всегда была одна и та же картинка (LordImage1).
        image: lordSkinImages[playerSkin] || null,
        x: 0,
        y: 0,
        size: 48,
        speed: 3.5,
        gold: 10000000000,
        width: 48,
        height: 48,
        facing: 'down',
        armySize: 0,
        isBot: false,
        hp: CREATURE_STATS.lord.maxHp,
        maxHp: CREATURE_STATS.lord.maxHp,
        category: CREATURE_STATS.lord.category,
        type: 'lord',
        team: 'player',
        isDefending: false, 
        lastDefenseHealTime: 0,
        inCombatTimer: 0, 
        regenTimer: 0,
        defenseRegenTimer: 0, 
      };
    
    // Переменные для режима защиты
    let isPlayerDefending = false;
    let defenseHealTimer = 0;
    const DEFENSE_HEAL_INTERVAL = 10000; // 10 секунд в миллисекундах
    let defenseActivationTime = 0; // Время активации режима защиты
  const DEFENSE_ACTIVATION_DELAY = 10000; // Задержка 10 секунд перед началом исцеления
  
    // --- Спутник для режима атаки ---
    const attackModeSatellite = {
      x: lord.x,
      y: lord.y,
      distanceFromLord: 175, // уменьшено с 200
    };
  
    // --- ДОБАВЛЕНО: Спутник для дальнебойных войск ---
    const rangedAttackModeSatellite = {
      x: lord.x,
      y: lord.y,
      distanceFromLord: 75, // Ближе к лорду
    };
  
    // --- Боты ---
    const bots = [];
  
    // --- Войска ---
    const troops = [];
  
    // --- Здания ---
    const towers = [];
  
    // --- Монеты ---
    const coinsOnMap = [];
    const droppedGolds = [];
    let lordCoinSpawnTimer = 0;
    const MAX_LORD_COINS = 10; // Максимум монет вокруг лорда
  
      // --- Бомбы на поле ---
    const bombs = []; // массив бомб с таймерами
    const towerProjectiles = [];      // Снаряды обычной башни "➡️"
    const magicTowerProjectiles = []; // Снаряды волшебной башни
    const magicTowerAoeCircles = [];  // Круги урона от волшебной башни
    const dragonFireballs = []; // Массив для огненных шаров дракона
    // --- ДОБАВЛЕНО: Статуи и их монеты ---
    const statues = [];
  
    // --- Клавиши ---
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
  
    // --- Джойстик ---
    const joystick = document.getElementById('joystick');
    const joystickBase = document.getElementById('joystick-base');
    const joystickThumb = document.getElementById('joystick-thumb');
  
    let joystickActive = false;
    let joystickCenter = {x: 0, y: 0};
    const joystickMaxDistance = 40;
  
    function updateKeysFromJoystick(dx, dy) {
      keys.ArrowUp = false;
      keys.ArrowDown = false;
      keys.ArrowLeft = false;
      keys.ArrowRight = false;
  
      const threshold = 0.3;
      if(dy < -threshold) keys.ArrowUp = true;
      else if(dy > threshold) keys.ArrowDown = true;
  
      if(dx < -threshold) keys.ArrowLeft = true;
      else if(dx > threshold) keys.ArrowRight = true;
    }
  
    function onJoystickStart(event) {
      event.preventDefault();
      joystickActive = true;
      const rect = joystickBase.getBoundingClientRect();
      joystickCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      moveJoystickThumb(event);
    }
    function onJoystickMove(event) {
      if(!joystickActive) return;
      event.preventDefault();
      moveJoystickThumb(event);
    }
    function onJoystickEnd(event) {
      if(!joystickActive) return;
      event.preventDefault();
      joystickActive = false;
      joystickThumb.style.transform = `translate(0px, 0px)`;
      updateKeysFromJoystick(0, 0);
    }
  
      function moveJoystickThumb(event) {
      let clientX, clientY;
      if(event.touches) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      let dx = clientX - joystickCenter.x;
      let dy = clientY - joystickCenter.y;
  
      const dist = Math.hypot(dx, dy);
      if(dist > joystickMaxDistance) {
        const scale = joystickMaxDistance / dist;
        dx *= scale;
        dy *= scale;
      }
  
          joystickThumb.style.transform = `translate(${dx}px, ${dy}px)`;
  
      const nx = dx / joystickMaxDistance;
      const ny = dy / joystickMaxDistance;
  
      // Обновляем глобальное направление джойстика, если он не в центре
      if (nx !== 0 || ny !== 0) {
        joystickDirection = { x: nx, y: ny };
      }
  
      updateKeysFromJoystick(nx, ny);
    }
  
    joystickThumb.addEventListener('touchstart', onJoystickStart);
    joystickThumb.addEventListener('touchmove', onJoystickMove);
    joystickThumb.addEventListener('touchend', onJoystickEnd);
      joystickThumb.addEventListener('mousedown', onJoystickStart);
    window.addEventListener('mousemove', onJoystickMove);
    window.addEventListener('mouseup', onJoystickEnd);
  
      // --- Элементы панели ---
    const goldCountEl = document.getElementById('goldCount');
    const summonSkeletonBtn = document.getElementById('summonSkeleton');
    const summonMonkeyBombBtn = document.getElementById('summonMonkeyBomb'); // !!! кнопка обезьяны с бомбой
    const summonDragonBtn = document.getElementById('summonDragon');
    const summonTrueDragonBtn = document.getElementById('summonTrueDragon');
    const summonMonkeyWithSwordBtn = document.getElementById('summonMonkeyWithSword');
    const summonArcherBtn = document.getElementById('summonArcher');
    const summonRamBtn = document.getElementById('summonRam'); // Кнопка для Тарана
    const summonDemonBtn = document.getElementById('summonDemon');
    const summonHugeBatBtn = document.getElementById('summonHugeBat');
    const summonTrueDemonBtn = document.getElementById('summonTrueDemon');
    const summonGoldenSkeletonBtn = document.getElementById('summonGoldenSkeleton');
    const summonCursedCoffinBtn = document.getElementById('summonCursedCoffin');
    const dropGoldBtn = document.getElementById('dropGold');
    const spawnToggleBtn = document.getElementById('spawnToggleBtn');
    const attackBtn = document.getElementById('attackBtn');
    const defenseBtn = document.getElementById('defenseBtn');
    const holdPositionBtn = document.getElementById('holdPositionBtn'); // Новая кнопка "Стоять"
    const teamSwitchBtn = document.getElementById('teamSwitchBtn'); // ДОБАВЛЕНО
    const panel = document.getElementById('panel');
  
    // --- Элементы выдвижных панелей ---
    const greenTroopsPanel = document.getElementById('greenTroopsPanel');
    const specialTroopsPanel = document.getElementById('specialTroopsPanel');
    const yellowTroopsPanel = document.getElementById('yellowTroopsPanel');
    const redTroopsPanel = document.getElementById('redTroopsPanel');
    
    const summonSkeletonSpecialBtn = document.getElementById('summonSkeletonSpecial');
    const summonZombieLeaderSpecialBtn = document.getElementById('summonZombieLeaderSpecial'); // ДОБАВЛЕНО
    const summonGhostSpecialBtn = document.getElementById('summonGhostSpecial');
    const summonBatSpecialBtn = document.getElementById('summonBatSpecial');
    const summonCoffinSpecialBtn = document.getElementById('summonCoffinSpecial');
    const summonVampireSpecialBtn = document.getElementById('summonVampireSpecial');
    const specialInfoText = specialTroopsPanel.querySelector('.infoText');
  
    // --- НОВЫЕ ЭЛЕМЕНТЫ: Панель пожертвования золота ---
    const goldDonationPanel = document.getElementById('goldDonationPanel');
  
    // --- Новые кнопки строительства ---
    const buildButtonsDiv = document.getElementById('buildButtons');
    const buildTowerBtn = document.getElementById('buildTowerBtn');
    const buildMagicTowerBtn = document.getElementById('buildMagicTowerBtn'); // ДОБАВЛЕНО
    const buildTombstoneBtn = document.getElementById('buildTombstoneBtn');
    const buildHouseBtn = document.getElementById('buildHouseBtn');
  
    // --- НОВЫЕ ЭЛЕМЕНТЫ: Кнопки управления зданием ---
    const buildingActionsPanel = document.getElementById('buildingActionsPanel');
    const upgradeBuildingBtn = document.getElementById('upgradeBuildingBtn');
    const sellBuildingBtn = document.getElementById('sellBuildingBtn');
  
    // --- Меню и Настройки ---
    const menu = document.getElementById('menu');
    const btnOffline = document.getElementById('btnOffline');
    const btnOnline = document.getElementById('btnOnline');
    const btnExit = document.getElementById('btnExit');
    const mainMenuButtons = document.getElementById('mainMenuButtons');
  
    // Элементы меню настроек
    const btnSettings = document.getElementById('btnSettings');
    const settingsMenu = document.getElementById('settingsMenu');
    const btnSwapUI = document.getElementById('btnSwapUI');
    const btnLanguage = document.getElementById('btnLanguage');
    const btnBackToMainFromSettings = document.getElementById('btnBackToMainFromSettings');
  
    // Элементы меню языка
    const languageMenu = document.getElementById('languageMenu');
    const btnBackToLang = document.getElementById('btnBackToLang');
  
    // --- Лидерборд ---
    const leaderboardList = document.getElementById('leaderboardList');
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    const leaderboardToggleBtn = document.getElementById('leaderboardToggleBtn');
  
    // --- Фон меню с объектами ---
    const menuOverlay = document.getElementById('menuOverlay');
  
      // --- Индикатор войск ---
    const troopCountDisplay = document.getElementById('troopCountDisplay');
    const currentTroopsEl = document.getElementById('currentTroops');
    const maxTroopsEl = document.getElementById('maxTroops');
  
    // --- НОВЫЕ ПЕРЕМЕННЫЕ: Для миникарты и обнаружения ---
    const minimapCanvas = document.getElementById('minimapCanvas');
    const minimapCtx = minimapCanvas.getContext('2d');
    const minimapToggleBtn = document.getElementById('minimapToggleBtn');
    let minimapVisible = true;
    const discoveredObjects = new Set(); // Хранит ID обнаруженных вражеских зданий и статуй
  
    // Переменные для отслеживания изменений в счётчике
    let lastCurrentTroopSlots = 0;
    let lastMaxTroopSlots = 100;
  
    // --- Флаги ---
    let spawnTroopsMode = true; // true - войска, false - здания
    let attackMode = false;
    let holdPositionMode = false; // НОВЫЙ РЕЖИМ: стоять на месте
    let demonSpawned = false;
    let demonSpawnCameraTimer = 0;
    const DEMON_SPAWN_CAMERA_DURATION = 1000;
  
      let tombstonePlaced = false;
      let joystickDirection = { x: 0, y: 1 }; // Глобальное направление джойстика
    let isPlacementBlocked = false; // НОВАЯ ПЕРЕМЕННАЯ: Блокирует постройку, если есть коллизия
  let nearbyBuilding = null; // Хранит здание, к которому подошел игрок
  let playerIsDead = false; // НОВАЯ ПЕРЕМЕННАЯ: Отслеживает, мертв ли игрок
  let buildingInfoPanel = null; // Ссылка на DOM элемент панели
  let blinkingAlpha = 0; // Переменная для анимации мигания
  
    // --- Буфер позиций лорда ---
    const lordPositionBuffer = [];
    const LORD_BUFFER_MAX_LENGTH = 20;
  
    // --- Демоновский кружок урона ---
    const demonDamageCircles = [];
    // Формат элемента: {x, y, radius, createdAt, duration, damagedUnitsSet}
  
    // --- Переменные для плавного прыжка демона ---
    // Добавим для демона свойство jumpTargetX, jumpTargetY, jumpProgress (0..1)
    // и плавное перемещение к цели за 0.2 секунды (200мс)
    // Также радиус агрессии увеличен до 35
  
    // --- Лимиты ---
    let currentTroopSlots = 0;
    let MAX_TROOPS_SLOTS = 100;
  
    // --- Вспомогательные функции ---
    // --- Вспомогательные функции ---
    function updateGoldDisplay(changeAmount = 0) {
      if (lord.isBot) return; // Анимация только для игрока
  
      const oldGold = lord.gold;
      lord.gold += changeAmount;
  
      goldCountEl.textContent = lord.gold;
  
      if (changeAmount !== 0) {
          const changeClass = changeAmount > 0 ? 'gold-increase' : 'gold-decrease';
          goldCountEl.classList.add(changeClass);
          setTimeout(() => {
              goldCountEl.classList.remove(changeClass);
          }, 300);
      }
    }
  
    function distance(a, b) {
      return Math.hypot(a.x - b.x, a.y - b.y);
    }
  
    function rectsOverlap(a, b) {
      return !(
        a.x + a.width < b.x ||
        a.x > b.x + b.width ||
        a.y + a.height < b.y ||
        a.y > b.y + b.height
      );
    }
  
    function isEnemy(ownerA, ownerB) {
      if(!ownerA || !ownerB) return false;
      if(ownerA.team === undefined || ownerB.team === undefined) return false;
      return ownerA.team !== ownerB.team;
    }
  
    // --- Подсчёт текущих войск для игрока и ботов отдельно ---
    function calculateTroopSlots() {
      let playerSlotsUsed = 0;
      let botsSlotsUsed = 0;
  
      for(const t of troops) {
        if(t.hp <= 0) continue;
        if(t.team === 'player') playerSlotsUsed += CREATURE_STATS[t.type]?.slotCost || 1;
        else botsSlotsUsed += CREATURE_STATS[t.type]?.slotCost || 1;
      }
      return {playerSlotsUsed, botsSlotsUsed};
    }
  
    // --- Нанесение урона ---
    function applyDamage(attacker, target, damageOverride = null, applySelfDamage = true) {
      if (target.hp <= 0 || !attacker || attacker.hp <= 0) return false;
  
      const targetStatsCheckImmunity = CREATURE_STATS[target.type];
      if (targetStatsCheckImmunity && targetStatsCheckImmunity.traits && targetStatsCheckImmunity.traits.includes('immuneToDamage')) {
        return false;
      }
  
      if (!isEnemy(attacker, target)) return false;
  
      const attackerStatsCheck = CREATURE_STATS[attacker.type];
      const targetStatsCheck = CREATURE_STATS[target.type];
      if (attackerStatsCheck && targetStatsCheck) {
          const attackerTraits = attackerStatsCheck.traits || [];
          const targetTraits = targetStatsCheck.traits || [];
          if (attackerTraits.includes('Bow') && targetTraits.includes('AntiBow')) {
              return false;
          }
      }
  
      if (attacker.category === 'troop' && attacker.team === 'player' && !attacker.isAttacking) {
          return false;
      }
  
      const attackerStats = CREATURE_STATS[attacker.type];
      const targetStats = CREATURE_STATS[target.type] || { category: target.category || 'lord' };
  
      const damageSource = damageOverride || attacker.damage || (attackerStats ? attackerStats.damage : null);
  
      let damageAmount = 0;
      if (damageSource) {
          if (targetStats.category === 'troop') damageAmount = damageSource.troop || 0;
          else if (targetStats.category === 'building') damageAmount = damageSource.building || 0;
          else if (targetStats.category === 'lord') damageAmount = damageSource.lord || 0;
      }
  
      if (damageAmount <= 0) return false;
  
      target.hp -= damageAmount;
  
      if (attacker.category === 'lord') attacker.inCombatTimer = 2000;
      if (target.category === 'lord') target.inCombatTimer = 2000;
      if (target.category === 'building') target.damageShakeTimer = 500;
      if (target.category === 'troop') target.damageShakeTimer = 300;
  
      if (target.category === 'troop' || target.category === 'building') {
          target.hpChangeData = { type: 'loss', time: performance.now() };
      }
      if (target.hp < 0) target.hp = 0;
      
      // --- НОВАЯ ЛОГИКА: Ярость для Зомби-вожатого ---
      if (attacker.type === 'zombieLeader') {
          if (attacker.rage < attackerStats.maxRage) {
              attacker.rage++;
          }
          if (attacker.rage >= attackerStats.maxRage) {
              const owner = (attacker.ownerId === lord.id) ? lord : bots.find(b => b.id === attacker.ownerId);
              if (owner) {
                  createTroop(owner, 'zombieFollower', { x: attacker.x, y: attacker.y });
              }
              attacker.rage = 0; // Сброс ярости
          }
      }
      
      // ВОЗВРАЩЕНА СПОСОБНОСТЬ: Логика ярости для Огромной летучей мыши
      if (attacker.type === 'hugeBat') {
          if (attacker.rageBites < 15) {
              attacker.rageBites++;
          }
          updateHugeBatStats(attacker); // Используем правильную функцию
          
          const healAmount = getHugeBatHeal(attacker); // Используем правильную функцию
          if (attacker.hp < attacker.maxHp) {
              attacker.hp += healAmount;
              if (attacker.hp > attacker.maxHp) attacker.hp = attacker.maxHp;
              attacker.hpChangeData = { type: 'gain', time: performance.now() };
          }
      }
  
      if (applySelfDamage && attackerStats && attackerStats.hpLossOnAttack !== undefined) {
          if (attackerStats.hpLossOnAttack > 0) {
              attacker.hp -= attackerStats.hpLossOnAttack;
              if (attacker.category === 'troop') {
                  attacker.hpChangeData = { type: 'loss', time: performance.now() };
              }
              if (attacker.hp < 0) attacker.hp = 0;
          } else if (attackerStats.hpLossOnAttack < 0) {
              if (attacker.hp < attacker.maxHp) {
                  attacker.hp -= attackerStats.hpLossOnAttack; 
                  if (attacker.hp > attacker.maxHp) attacker.hp = attacker.maxHp;
                  if (attacker.category === 'troop') {
                      attacker.hpChangeData = { type: 'gain', time: performance.now() };
                  }
              }
          }
      }
  
      return true;
    }
    
    // --- НОВЫЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ОГРОМНОЙ ЛЕТУЧЕЙ МЫШИ ---
    function updateHugeBatStats(bat) {
      if (bat.type !== 'hugeBat') return;
  
      const level = Math.floor(bat.rageBites / 5);
      let newDamage;
      let newSize;
  
      if (level >= 3) { // 15+ укусов
          newDamage = { troop: 60, building: 24, lord: 25 };
          newSize = 150;
      } else if (level === 2) { // 10-14 укусов
          newDamage = { troop: 30, building: 12, lord: 15 };
          newSize = 100;
      } else if (level === 1) { // 5-9 укусов
          newDamage = { troop: 15, building: 6, lord: 7 };
          newSize = 85;
      } else { // 0-4 укуса
          newDamage = { troop: 10, building: 3, lord: 5 };
          newSize = 50;
      }
      
      bat.damage = newDamage;
      bat.originalDamage = { ...newDamage };
      bat.size = newSize;
    }
    
    function getHugeBatHeal(bat) {
      if (bat.type !== 'hugeBat') return 0;
      const level = Math.floor(bat.rageBites / 5);
      if (level >= 3) return 30;
      if (level === 2) return 10;
      if (level === 1) return 5;
      return 3;
    }
  
    // Вспомогательная функция для розовой вспышки элемента
    function flashElementPink(element, duration) {
      if (!element) return;
      element.classList.add('limit-flash-pink');
      setTimeout(() => {
          element.classList.remove('limit-flash-pink');
      }, duration);
    }
  
       // --- Создание войск ---
    function createTroop(owner, type, options = {}) {
      const stats = CREATURE_STATS[type];
      if (!stats) return false;
  
      // Проверка, инициирован ли спавн кликом игрока (для показа уведомлений)
      const isPlayerClick = owner.id === 'player' && options.spawnedByPlayerClick;
  
      // Проверка на Надгробие и его уровень для особых юнитов
      const specialUnits = ['skeleton', 'bat', 'coffin', 'vampire', 'ghost', 'hugeBat', 'goldenSkeleton', 'cursedCoffin', 'zombieLeader'];
      if (owner.team === 'player' && specialUnits.includes(type)) {
          const tombstone = towers.find(t => t.type === 'tombstone' && t.ownerId === owner.id);
          if (!tombstone) {
              if (isPlayerClick) showLimitationMessage('notification_tombstone_needed');
              return false;
          }
  
          const tombstoneStats = CREATURE_STATS.tombstone;
          const currentLevelInfo = tombstoneStats.levels[tombstone.level];
          
          if (type === 'goldenSkeleton' || type === 'cursedCoffin' || type === 'hugeBat') {
              if (tombstone.level < 3) {
                   if (isPlayerClick) showLimitationMessage('notification_tombstone_max');
                   return false;
              }
          } 
          else if (!currentLevelInfo.allows.includes(type)) {
              const requiredLevel = tombstoneStats.levels.findIndex(l => l.allows.includes(type));
              if (isPlayerClick) {
                  if (requiredLevel === 1) showLimitationMessage('notification_tombstone_silver');
                  else if (requiredLevel === 2) showLimitationMessage('notification_tombstone_gold');
                  else if (requiredLevel === 3) showLimitationMessage('notification_tombstone_max');
              }
              return false;
          }
      }
  
      if (!options.free && owner.gold < stats.cost) {
          if (isPlayerClick) {
              flashElementPink(goldCountEl, 300);
              showLimitationMessage('notification_no_gold');
          }
          return false;
      }
  
      const slots = calculateTroopSlots();
      let usedSlots = (owner.team === 'player') ? slots.playerSlotsUsed : slots.botsSlotsUsed;
      let maxSlots = (owner.team === 'player') ? MAX_TROOPS_SLOTS : 100;
  
      if (usedSlots + stats.slotCost > maxSlots) {
          if (isPlayerClick) {
              flashElementPink(maxTroopsEl, 300);
              showLimitationMessage('notification_troop_limit');
          }
          return false;
      }
  
      if (stats.maxCount && owner.team === 'player') {
          const currentUnitCount = troops.filter(t => t.ownerId === owner.id && t.type === type).length;
          if (currentUnitCount >= stats.maxCount) {
              return false;
          }
      }
  
      if (!options.free) {
          if (owner.id === 'player') {
              updateGoldDisplay(-stats.cost);
          } else {
              owner.gold -= stats.cost;
          }
      }
      
      if (owner.team === 'player') {
        currentTroopSlots += stats.slotCost;
      }
  
      let x, y;
      if (options.x !== undefined && options.y !== undefined) {
        x = options.x + (Math.random() * 20 - 10);
        y = options.y + (Math.random() * 20 - 10);
      } else if (typeof options.initialAngle === 'number' && typeof options.initialRadius === 'number') {
        x = owner.x + Math.cos(options.initialAngle) * options.initialRadius;
        y = owner.y + Math.sin(options.initialAngle) * options.initialRadius;
      } else {
        x = owner.x + (Math.random() * 40 - 20);
        y = owner.y + (Math.random() * 40 - 20);
      }
      
      const unitSize = stats.size || 32;
  
      const newTroop = {
        id: crypto.randomUUID(),
        ownerId: owner.id,
        team: owner.team,
        type,
        emoji: stats.emoji || '?',
        size: unitSize,
        slotCost: stats.slotCost,
        x, y,
        width: unitSize,
        height: unitSize,
        hp: type === 'superBat' ? 150 : (stats.baseHp !== undefined ? stats.baseHp : stats.maxHp),
        maxHp: stats.maxHp,
        facing: 'down',
        attackCooldown: 0,
        attackCooldownMax: stats.attackCooldownMax || 1000,
        attackAnimTimer: 0,
        category: stats.category,
        isAttacking: owner.team === 'player' ? (attackMode || holdPositionMode) : true,
        originalDamage: { ...stats.damage },
        abilityTriggered: false,
        hpChangeData: null,
        jumpTargetX: null,
        jumpTargetY: null,
        jumpProgress: 0,
        chargeProgress: 0,
        chargeTargetX: null,
        chargeTargetY: null,
        chargeTargetId: null,
        startX: 0,
        startY: 0,
      };
  
      if (newTroop.team === 'player') {
          newTroop.damage = newTroop.isAttacking ? { ...newTroop.originalDamage } : { troop: 0, building: 0, lord: 0 };
      } else {
          newTroop.damage = { ...newTroop.originalDamage };
      }
  
      if (type === 'monkeyWithSword') {
        newTroop.swordAngle = 0;
        newTroop.swordDistance = 45;
        newTroop.swordAttackCooldown = 0;
        newTroop.swordRotationSpeed = 15;
      }
  
      if (type === 'dragon' || type === 'trueDragon') {
        newTroop.fireConeAngle = 0;
        newTroop.fireballSpawnCooldown = 0;
      }
  
      if (type === 'ghost') {
        newTroop.defenseDamageTimer = 0;
      }
      
      if (type === 'hugeBat') {
          newTroop.rageBites = 0;
          newTroop.rageDecayTimer = 5000;
      }
      
      if (type === 'zombieLeader') {
          newTroop.rage = 0;
      }
      
      if (type === 'cursedCoffin') {
          newTroop.isAggressive = false;
          newTroop.spawnedSkeletonsCount = 0;
          newTroop.phase1Spawned = false;
          newTroop.phase2Spawned = false;
          newTroop.phase3Spawned = false;
          newTroop.phase4Spawned = false;
      }
  
      if (options.parentCoffinId) {
          newTroop.parentCoffinId = options.parentCoffinId;
      }
  
      troops.push(newTroop);
      return true;
    }
  
    // --- Создание зданий ---
    function createTower(owner, type = 'tower') {
      const stats = CREATURE_STATS[type];
      if (!stats) return false;
  
      // Получаем характеристики нулевого уровня
      const level0Stats = stats.levels[0];
      if (!level0Stats) return false;
  
      // ПРОВЕРКА 1: Нельзя строить, если место занято
      if (isPlacementBlocked) return false;
  
      // ПРОВЕРКА 2: Стоимость
      if (owner.gold < level0Stats.cost) {
        if (owner.id === 'player') {
          flashElementPink(goldCountEl, 300);
          showLimitationMessage('notification_no_gold');
        }
        return false;
      }
  
      // ПРОВЕРКА 3: Лимит зданий
      const currentBuildingCount = towers.filter(t => t.type === type && t.ownerId === owner.id).length;
      if (currentBuildingCount >= stats.maxCount) {
        if (owner.id === 'player') {
          const limitTextElement = document.getElementById(`${type}LimitText`);
          flashElementPink(limitTextElement, 300);
          showLimitationMessage('notification_building_limit');
        }
        return false;
      }
  
      // Здание появляется в центре владельца
      const newBuildingX = owner.x;
      const newBuildingY = owner.y;
  
      // ПРОВЕРКА 4: Дополнительная проверка наложения
      const newBuildingRadius = stats.hitboxRadius || 30;
      for (const building of towers) {
          const existingBuildingRadius = CREATURE_STATS[building.type].hitboxRadius || 30;
          if (distance({ x: newBuildingX, y: newBuildingY }, building) < newBuildingRadius + existingBuildingRadius) {
             return false;
          }
      }
  
      updateGoldDisplay(-level0Stats.cost);
  
      // Увеличиваем МАКСИМАЛЬНОЕ количество войск, если это Дом
      if (type === 'house') {
        MAX_TROOPS_SLOTS = Math.min(1100, MAX_TROOPS_SLOTS + level0Stats.troopSlotsIncrease);
      }
  
      const newBuilding = {
        id: crypto.randomUUID(),
        ownerId: owner.id,
        team: owner.team,
        type,
        level: 0, // Всегда начинаем с 0 уровня
        emoji: level0Stats.emoji,
        hp: level0Stats.maxHp,
        maxHp: level0Stats.maxHp,
        damage: { ...(level0Stats.damage || {}) },
        attackRadius: level0Stats.attackRadius || 0,
        shootCooldown: 0,
        shootCooldownMax: level0Stats.attackSpeed || 0,
        x: newBuildingX,
        y: newBuildingY,
        size: stats.size,
        width: stats.width,
        height: stats.height,
        category: stats.category,
        shotVisualTimer: 0,
      };
  
      towers.push(newBuilding);
  
      // Выталкивание лорда после постройки
      if (owner.id === lord.id) {
          const pushRadius = (stats.hitboxRadius || stats.size / 2) + (lord.size / 2) + 5;
          const pushAngle = Math.atan2(joystickDirection.y, joystickDirection.x) + Math.PI;
          lord.x = newBuilding.x + Math.cos(pushAngle) * pushRadius;
          lord.y = newBuilding.y + Math.sin(pushAngle) * pushRadius;
      }
  
      if (type === 'tombstone' && owner.team === 'player') {
        tombstonePlaced = true;
      }
  
      return true;
    }
  
   // --- ИЗМЕНЕННАЯ ФУНКЦИЯ: Показывает сообщение в панели уведомлений по ключу перевода ---
  let limitationMessageTimeout = null;
  function showLimitationMessage(translationKey) {
      const panel = document.getElementById('limitationNotificationPanel');
      if (!panel) return;
  
      // Если уже есть сообщение, сбрасываем старый таймер
      if (limitationMessageTimeout) {
          clearTimeout(limitationMessageTimeout);
      }
  
      // Находим переведенный текст по ключу, или используем сам ключ, если перевод не найден
      const message = translations[currentLanguage][translationKey] || translationKey;
      
      panel.innerHTML = message; // Вставляем переведенный текст
      panel.classList.add('visible'); // Показываем панель с анимацией
  
      // Ставим таймер на скрытие панели через 3 секунды
      limitationMessageTimeout = setTimeout(() => {
          panel.classList.remove('visible');
      }, 3000);
  }
  
    function updateBuildingInfoPanel(building) {
        if (!buildingInfoPanel) {
            buildingInfoPanel = {
                panel: document.getElementById('buildingInfoPanel'),
                name: document.getElementById('buildingInfoName'),
                stats: document.getElementById('buildingInfoStats'),
                level: document.getElementById('buildingInfoLevel'),
                hp: document.getElementById('buildingInfoHP'),
                damageRow: document.getElementById('buildingInfoDamageRow'),
                damage: document.getElementById('buildingInfoDamage'),
                attackSpeedRow: document.getElementById('buildingInfoAttackSpeedRow'),
                attackSpeed: document.getElementById('buildingInfoAttackSpeed'),
                radiusRow: document.getElementById('buildingInfoRadiusRow'),
                radius: document.getElementById('buildingInfoRadius'),
                description: document.getElementById('buildingInfoDescription'),
                separator: document.getElementById('buildingInfoSeparator'),
                sell: document.getElementById('buildingInfoSell'),
                repair: document.getElementById('buildingInfoRepair'),
                upgrade: document.getElementById('buildingInfoUpgrade'),
            };
        }
  
        if (!building) return;
  
        const baseStats = CREATURE_STATS[building.type];
        if (!baseStats || !baseStats.levels) return;
  
        const currentLevel = building.level;
        const currentLevelStats = baseStats.levels[currentLevel];
        const nextLevelStats = baseStats.levels[currentLevel + 1];
  
        // Получаем переводы
        const lang = currentLanguage;
        const buildingNameKey = `building_name_${building.type}`;
        const buildingDescKey = `building_desc_${building.type}`;
        const buildingName = translations[lang][buildingNameKey] || building.type;
        let buildingDescription = translations[lang][buildingDescKey] || '';
  
        // --- Сброс видимости ---
        buildingInfoPanel.stats.style.display = 'none';
        buildingInfoPanel.description.style.display = 'none';
        buildingInfoPanel.damageRow.style.display = 'none';
        buildingInfoPanel.attackSpeedRow.style.display = 'none';
        buildingInfoPanel.radiusRow.style.display = 'none';
        buildingInfoPanel.separator.style.display = 'block';
        buildingInfoPanel.repair.parentElement.style.display = 'block';
        buildingInfoPanel.upgrade.parentElement.style.display = 'block';
  
        // --- Общие данные ---
        buildingInfoPanel.name.textContent = `${building.emoji} ${buildingName}`;
        buildingInfoPanel.level.textContent = currentLevel;
        buildingInfoPanel.hp.textContent = `${building.hp}/${building.maxHp}`;
        
        let totalInvestment = baseStats.levels[0].cost;
        for (let i = 0; i < currentLevel; i++) {
            totalInvestment += baseStats.levels[i].upgradeCost;
        }
        const sellValue = Math.ceil(totalInvestment / 2);
        buildingInfoPanel.sell.innerHTML = `💰 <span class="stat-sell">${sellValue}</span>`;
        
        const repairCost = currentLevelStats.repairCost;
        buildingInfoPanel.repair.innerHTML = `💰 <span class="stat-sell">${repairCost}</span>`;
        
        // --- Уникальные данные ---
        buildingInfoPanel.stats.style.display = 'block'; // Показываем статы для всех зданий
        switch (building.type) {
            case 'tower':
                buildingInfoPanel.damageRow.style.display = 'flex';
                buildingInfoPanel.attackSpeedRow.style.display = 'flex';
                buildingInfoPanel.radiusRow.style.display = 'flex';
                
                buildingInfoPanel.damage.textContent = building.damage.troop;
                buildingInfoPanel.attackSpeed.textContent = `${building.shootCooldownMax / 1000} сек`;
                buildingInfoPanel.radius.textContent = building.attackRadius;
                break;
            case 'magicTower':
                buildingInfoPanel.damageRow.style.display = 'flex';
                buildingInfoPanel.attackSpeedRow.style.display = 'flex';
                buildingInfoPanel.radiusRow.style.display = 'flex';
                
                buildingInfoPanel.damage.textContent = currentLevelStats.damage;
                buildingInfoPanel.attackSpeed.textContent = `${currentLevelStats.attackSpeed / 1000} сек`;
                buildingInfoPanel.radius.textContent = currentLevelStats.attackRadius;
                // Добавляем инфо о радиусе взрыва в основное описание
                buildingDescription += ` (AoE: ${currentLevelStats.aoeRadius})`;
                break;
            case 'house':
               // Для дома описание динамическое, не из перевода
                buildingDescription = `Дает +${currentLevelStats.troopSlotsIncrease} места для войск.`;
                break;
            case 'tombstone':
                // Для надгробия тоже
                buildingDescription = `Призывает: ${currentLevelStats.allows.join(', ')}.`;
                break;
        }
  
        // Устанавливаем и показываем описание
        if(buildingDescription) {
          buildingInfoPanel.description.style.display = 'block';
          buildingInfoPanel.description.innerHTML = buildingDescription;
        }
  
        // --- Данные для улучшения ---
        if (nextLevelStats) {
            const upgradeCost = currentLevelStats.upgradeCost;
            buildingInfoPanel.upgrade.innerHTML = `💰 <span class="stat-upgrade">${upgradeCost}</span>`;
            upgradeBuildingBtn.disabled = lord.gold < upgradeCost;
  
            if (nextLevelStats.maxHp) {
                buildingInfoPanel.hp.innerHTML = `${building.hp}/${building.maxHp} <span class="stat-increase">+${nextLevelStats.maxHp - building.maxHp}</span>`;
            }
            
            if (nextLevelStats.damage !== undefined) {
                if (typeof nextLevelStats.damage === 'object' && building.damage && building.damage.troop !== undefined) {
                    buildingInfoPanel.damage.innerHTML = `${building.damage.troop} <span class="stat-increase">+${nextLevelStats.damage.troop - building.damage.troop}</span>`;
                } 
                else if (typeof nextLevelStats.damage === 'number') {
                    buildingInfoPanel.damage.innerHTML = `${currentLevelStats.damage} <span class="stat-increase">+${nextLevelStats.damage - currentLevelStats.damage}</span>`;
                }
            }
  
            if (nextLevelStats.attackRadius && building.attackRadius) {
                buildingInfoPanel.radius.innerHTML = `${building.attackRadius} <span class="stat-increase">+${nextLevelStats.attackRadius - building.attackRadius}</span>`;
            }
            if (nextLevelStats.attackSpeed !== undefined) {
                const currentSpeed = building.shootCooldownMax || currentLevelStats.attackSpeed;
                if (currentSpeed !== nextLevelStats.attackSpeed) {
                  buildingInfoPanel.attackSpeed.innerHTML = `${currentSpeed / 1000}с -> <span class="stat-increase">${nextLevelStats.attackSpeed / 1000}с</span>`;
                }
            }
            // Добавляем инфо об улучшении в описание
            if (nextLevelStats.troopSlotsIncrease) {
                buildingInfoPanel.description.innerHTML += ` <span class="stat-increase">(+${nextLevelStats.troopSlotsIncrease})</span>`;
            }
             if (nextLevelStats.aoeRadius && currentLevelStats.aoeRadius) {
                buildingInfoPanel.description.innerHTML += ` <span class="stat-increase">(+${nextLevelStats.aoeRadius - currentLevelStats.aoeRadius})</span>`;
             }
        } else {
            const maxLevelText = translations[currentLanguage].stat_max_level || "Макс.";
            buildingInfoPanel.upgrade.textContent = maxLevelText;
            upgradeBuildingBtn.disabled = true;
        }
        
        repairBuildingBtn.disabled = (building.hp === building.maxHp) || (lord.gold < repairCost);
    }
    
    // --- Создание начального войска для бота ---
    function createInitialBotArmy(bot) {
      const count = 10; // ИЗМЕНЕНО: Даем 10 юнитов
      const radius = 50;
      for(let i=0; i<count; i++) {
        const angle = (i / count) * Math.PI * 2;
        // ИЗМЕНЕНО: Призываем обезьянок ('monkey') вместо несуществующих 'human'
        createTroop(bot, 'monkey', {initialAngle: angle, initialRadius: radius, free: true, noAttackLord: true});
      }
    }
  
      // --- Обновление игрока ---
      function updateLord() {
      let dx = 0, dy = 0;
      if(keys.ArrowUp) dy -= 1;
      if(keys.ArrowDown) dy += 1;
      if(keys.ArrowLeft) dx -= 1;
      if(keys.ArrowRight) dx += 1;
  
      if(dx !== 0 || dy !== 0) {
        const len = Math.hypot(dx, dy);
        dx /= len;
        dy /= len;
        lord.x += dx * lord.speed;
        lord.y += dy * lord.speed;
  
        if(Math.abs(dx) > Math.abs(dy)) lord.facing = dx > 0 ? 'right' : 'left';
        else lord.facing = dy > 0 ? 'down' : 'up';
      }
      
      // ДОБАВЛЕНО: Ограничение передвижения границами мира
      const lordRadius = lord.size / 2;
      // Упираемся не в самый край мира, а в начало черной полосы
      const worldLimit = WORLD_RADIUS - WORLD_BORDER_WIDTH; 
      if (lord.x < -worldLimit + lordRadius) lord.x = -worldLimit + lordRadius;
      if (lord.x > worldLimit - lordRadius) lord.x = worldLimit - lordRadius;
      if (lord.y < -worldLimit + lordRadius) lord.y = -worldLimit + lordRadius;
      if (lord.y > worldLimit - lordRadius) lord.y = worldLimit - lordRadius;
  
  
      // Объединяем все статические объекты для проверки столкновений
      const staticObstacles = [...towers, ...statues];
  
      for (const obstacle of staticObstacles) {
          // Оптимизация: Пропускаем проверку столкновений с объектами далеко от игрока
          if (distance(lord, obstacle) > 500) continue;
  
          const stats = CREATURE_STATS[obstacle.type];
          if (!stats || !stats.hitboxRadius) continue;
  
          const d = distance(lord, obstacle);
          const min_d = (lord.size / 2) + stats.hitboxRadius;
  
          if (d > 0 && d < min_d) {
              const push = (min_d - d);
              const angle = Math.atan2(lord.y - obstacle.y, lord.x - obstacle.x);
              lord.x += Math.cos(angle) * push;
              lord.y += Math.sin(angle) * push;
          }
      }
    }
  
    // --- Обновление ботов ---
    const BOT_TOWER_SPAWN_INTERVAL = 30000;
    for(const bot of bots) {
      bot.gold = 3000;
      bot.lastTowerSpawn = 0;
    }
  
      function updateBots(delta) {
      for(const bot of bots) {
          // --- НОВАЯ ЛОГИКА РЕСПАВНА ---
          if (bot.isDead) {
              bot.respawnTimer -= delta;
              if (bot.respawnTimer <= 0) {
                  bot.isDead = false;
                  bot.hp = bot.maxHp;
                  bot.gold = 3000;
                  bot.x = lord.x + (Math.random() * WORLD_RADIUS - WORLD_RADIUS / 2);
                  bot.y = lord.y + (Math.random() * WORLD_RADIUS - WORLD_RADIUS / 2);
                  createInitialBotArmy(bot);
              }
              continue; // Пропускаем остальную логику для мертвого бота
          }
  
          // >>> НАЧАЛО ИЗМЕНЕНИЙ ДЛЯ ОПТИМИЗАЦИИ <<<
          // Пропускаем полную обработку ботов, которые очень далеко от игрока
          if (distance(bot, lord) > PROCESSING_RADIUS) {
              continue; // Бот "замораживается", если слишком далеко
          }
          // >>> КОНЕЦ ИЗМЕНЕНИЙ ДЛЯ ОПТИМИЗАЦИИ <<<
  
          if (bot.hp <= 0 && !bot.isDead) {
              bot.isDead = true;
              bot.respawnTimer = 30000;
              for(let i = troops.length - 1; i >= 0; i--) {
                  if(troops[i].ownerId === bot.id) troops.splice(i, 1);
              }
              for(let i = towers.length - 1; i >= 0; i--) {
                  if(towers[i].ownerId === bot.id) towers.splice(i, 1);
              }
              continue;
          }
          // --- КОНЕЦ ЛОГИКИ РЕСПАВНА ---
  
          if(!bot.targetMoveTime || bot.targetMoveTime <= 0) {
              bot.moveDir = { x: Math.random()*2 - 1, y: Math.random()*2 - 1 };
              const len = Math.hypot(bot.moveDir.x, bot.moveDir.y);
              if(len > 0) { bot.moveDir.x /= len; bot.moveDir.y /= len; }
              bot.targetMoveTime = 1000 + Math.random()*2000;
          } else {
              bot.targetMoveTime -= delta;
              bot.x += bot.moveDir.x * bot.speed * delta / 16;
              bot.y += bot.moveDir.y * bot.speed * delta / 16;
          }
          
          // Ограничение передвижения ботов границами мира
          const botRadius = bot.size / 2;
          const worldLimit = WORLD_RADIUS - WORLD_BORDER_WIDTH;
          if (bot.x < -worldLimit + botRadius) bot.x = -worldLimit + botRadius;
          if (bot.x > worldLimit - botRadius) bot.x = worldLimit - botRadius;
          if (bot.y < -worldLimit + botRadius) bot.y = -worldLimit + botRadius;
          if (bot.y > worldLimit - botRadius) bot.y = worldLimit - botRadius;
  
  
          // --- СТОЛКНОВЕНИЕ БОТОВ СО ЗДАНИЯМИ ---
          for (const building of towers) {
              const buildingStats = CREATURE_STATS[building.type];
              if (!buildingStats || !buildingStats.hitboxRadius) continue;
              const d = distance(bot, building);
              const min_d = (bot.size / 2) + buildingStats.hitboxRadius;
              if (d > 0 && d < min_d) {
                  const push = (min_d - d);
                  const angle = Math.atan2(bot.y - building.y, bot.x - building.x);
                  bot.x += Math.cos(angle) * push;
                  bot.y += Math.sin(angle) * push;
              }
          }
  
          for(const coin of coinsOnMap) {
              if(!coin.visible) continue;
              const dist = distance(bot, coin);
              if(dist < 150) {
                  const dx = coin.x - bot.x;
                  const dy = coin.y - bot.y;
                  const len = Math.hypot(dx, dy);
                  if(len > 0) {
                      bot.x += (dx / len) * bot.speed * delta / 16;
                      bot.y += (dy / len) * bot.speed * delta / 16;
                  }
                  if(dist < 20) {
                      bot.gold += coin.value;
                      coin.visible = false;
                      coin.respawnTimer = 10000000;
                  }
                  break;
              }
          }
  
          if(bot.gold >= 3000 && !bot.bonusGiven) {
              for(let i=0; i<15; i++) createTroop(bot, 'monkey'); // ИСПРАВЛЕНО: human -> monkey
              bot.bonusGiven = true;
          }
  
          bot.lastTowerSpawn = (bot.lastTowerSpawn || 0) + delta;
          if (bot.lastTowerSpawn >= BOT_TOWER_SPAWN_INTERVAL) {
              bot.lastTowerSpawn = 0;
  
              let buildingType = null;
              let buildingLevel = 0;
              let levelStats = null;
              let baseStats = null;
  
              if (bot.id === 'bot1') { // Красный: строит обычные башни 0 уровня
                  buildingType = 'tower';
                  levelStats = CREATURE_STATS.tower.levels[0];
                  baseStats = CREATURE_STATS.tower;
              } else if (bot.id === 'bot2') { // Оранжевый: строит магические башни 0 уровня
                  buildingType = 'magicTower';
                  levelStats = CREATURE_STATS.magicTower.levels[0];
                  baseStats = CREATURE_STATS.magicTower;
              } else if (bot.id === 'bot4') { // Желтый: строит башни 2 уровня (Золотые)
                  buildingType = 'tower';
                  buildingLevel = 2; // ИЗМЕНЕНО: был 1
                  levelStats = CREATURE_STATS.tower.levels[2]; // ИЗМЕНЕНО: был [1]
                  baseStats = CREATURE_STATS.tower;
              } else if (bot.id === 'bot5') { // Голубой: строит магические башни 2 уровня (Золотые)
                  buildingType = 'magicTower';
                  buildingLevel = 2; // ИЗМЕНЕНО: был 1
                  levelStats = CREATURE_STATS.magicTower.levels[2]; // ИЗМЕНЕНО: был [1]
                  baseStats = CREATURE_STATS.magicTower;
              }
  
              // Если бот должен что-то строить и у него хватает золота
              if (buildingType && levelStats && bot.gold >= levelStats.cost) {
                  const offsetX = bot.width / 2 + 48 + 5 + (Math.random() * 50 - 25);
                  const towerX = bot.x + offsetX;
                  const towerY = bot.y + (Math.random() * 50 - 25);
                  const newBuildingRadius = baseStats.hitboxRadius || 45;
                  let canPlace = true;
                  for (const t of towers) {
                      const existingRadius = CREATURE_STATS[t.type].hitboxRadius || 30;
                      if (distance({ x: towerX, y: towerY }, t) < newBuildingRadius + existingRadius) {
                          canPlace = false;
                          break;
                      }
                  }
                  if (canPlace) {
                      bot.gold -= levelStats.cost;
                      towers.push({
                          id: crypto.randomUUID(),
                          ownerId: bot.id,
                          team: bot.team,
                          type: buildingType,
                          level: buildingLevel, // Устанавливаем нужный уровень
                          emoji: levelStats.emoji,
                          hp: levelStats.maxHp,
                          maxHp: levelStats.maxHp,
                          damage: { ...(levelStats.damage || {}) },
                          attackRadius: levelStats.attackRadius || 0,
                          shootCooldown: 0,
                          shootCooldownMax: levelStats.attackSpeed || 0,
                          x: towerX,
                          y: towerY,
                          size: baseStats.size,
                          width: baseStats.width,
                          height: baseStats.height,
                          category: baseStats.category,
                          shotVisualTimer: 0,
                      });
                  }
              }
          }
      }
    }
    
            // --- ДОБАВЛЕНО: СТОЛКНОВЕНИЕ БОТОВ СО СТАТУЯМИ ---
          for (const statue of statues) {
              const statueStats = CREATURE_STATS.statue;
              const d = distance(bot, statue);
              const min_d = (bot.size / 2) + statueStats.hitboxRadius;
  
              if (d > 0 && d < min_d) {
                  const push = (min_d - d);
                  const angle = Math.atan2(bot.y - statue.y, bot.x - statue.x);
                  bot.x += Math.cos(angle) * push;
                  bot.y += Math.sin(angle) * push;
              }
          }
  
          // --- Обновление войск ---
    function updateTroops(delta) {
      const baseSpeed = lord.speed;
      const attackSpeedMultiplier = 15;
      const now = performance.now();
      const allTargets = [...troops, ...towers, lord, ...bots];
  
      for (const unit of troops) {
          if (unit.hp <= 0) continue;
          if (unit.attackCooldown > 0) unit.attackCooldown -= delta;
          if (unit.attackAnimTimer > 0) unit.attackAnimTimer -= delta;
          if (unit.swordAttackCooldown > 0) unit.swordAttackCooldown -= delta;
          if (unit.damageShakeTimer > 0) unit.damageShakeTimer -= delta;
          
          // --- ЛОГИКА СПОСОБНОСТЕЙ ---
          if (unit.type === 'hugeBat') {
              unit.rageDecayTimer -= delta;
              if (unit.rageDecayTimer <= 0) {
                  unit.rageDecayTimer += 5000; // Сбрасываем таймер
                  // НОВАЯ ЛОГИКА: Ярость спадает, если у мыши не полное ХП.
                  if (unit.hp < unit.maxHp && unit.rageBites > 0) {
                      unit.rageBites--;
                      updateHugeBatStats(unit); // Обновляем статы после спада ярости
                  }
              }
          }
      }
  
      lordPositionBuffer.push({ x: lord.x, y: lord.y });
      if (lordPositionBuffer.length > LORD_BUFFER_MAX_LENGTH) lordPositionBuffer.shift();
  
      if (attackMode) {
          let dirX = joystickDirection.x;
          let dirY = joystickDirection.y;
          if (dirX === 0 && dirY === 0) {
              dirX = attackModeSatellite.lastDirX || 0;
              dirY = attackModeSatellite.lastDirY || 1;
          } else {
              const len = Math.hypot(dirX, dirY);
              if (len > 0) {
                 attackModeSatellite.lastDirX = dirX / len;
                 attackModeSatellite.lastDirY = dirY / len;
              }
          }
  
          const sharedDirX = attackModeSatellite.lastDirX;
          const sharedDirY = attackModeSatellite.lastDirY;
          const troopAttackMoveSpeed = baseSpeed * attackSpeedMultiplier * 0.15;
          const satelliteSpeed = troopAttackMoveSpeed * 10000.1;
  
          const satellites = [attackModeSatellite, rangedAttackModeSatellite];
          for (const sat of satellites) {
              const targetX = lord.x + sharedDirX * sat.distanceFromLord;
              const targetY = lord.y + sharedDirY * sat.distanceFromLord;
              const dxSat = targetX - sat.x;
              const dySat = targetY - sat.y;
              const distSat = Math.hypot(dxSat, dySat);
              if (distSat > satelliteSpeed) {
                  sat.x += (dxSat / distSat) * satelliteSpeed;
                  sat.y += (dySat / distSat) * satelliteSpeed;
              } else if (distSat > 0) {
                  sat.x = targetX;
                  sat.y = targetY;
              }
              const currentDist = distance(sat, lord);
              const targetDist = sat.distanceFromLord;
              if (Math.abs(currentDist - targetDist) > 1) { 
                  const angle = Math.atan2(sat.y - lord.y, sat.x - lord.x);
                  sat.x = lord.x + Math.cos(angle) * targetDist;
                  sat.y = lord.y + Math.sin(angle) * targetDist;
              }
          }
      }
  
      const attackFormationTargets = new Map();
      if (attackMode) {
          const playerAttackTroops = troops.filter(t => t.ownerId === lord.id && t.hp > 0);
          const spacing = 15;
          const angleIncrement = Math.PI * (3 - Math.sqrt(5));
          for (let i = 0; i < playerAttackTroops.length; i++) {
              const troop = playerAttackTroops[i];
              const radius = spacing * Math.sqrt(i + 1);
              const angle = i * angleIncrement;
              const targetX = attackModeSatellite.x + Math.cos(angle) * radius;
              const targetY = attackModeSatellite.y + Math.sin(angle) * radius;
              attackFormationTargets.set(troop.id, { x: targetX, y: targetY });
          }
      }
  
      for (let i = troops.length - 1; i >= 0; i--) {
          const unit = troops[i];
          if (!unit || unit.hp <= 0) continue;
  
          if (unit.type === 'ghost' && unit.ownerId === lord.id) {
            if (attackMode) {
              unit.attackDamageTimer = (unit.attackDamageTimer || 0) + delta;
              if (unit.attackDamageTimer >= 1000) {
                  unit.hp -= 5;
                  unit.attackDamageTimer -= 1000;
              }
              unit.hpChangeData = { type: 'loss', time: performance.now() };
            } else if (isPlayerDefending) {
              unit.defenseDamageTimer = (unit.defenseDamageTimer || 0) + delta;
              if (unit.defenseDamageTimer >= 10000) {
                unit.defenseDamageTimer -= 10000;
                unit.hp -= 1;
                unit.hpChangeData = { type: 'loss', time: performance.now() };
              }
            }
            if (unit.hp < 0) unit.hp = 0;
          }
          
          if (unit.type === 'cursedCoffin' || unit.type === 'aggressiveCursedCoffin') {
              const owner = (unit.ownerId === lord.id) ? lord : bots.find(b => b.id === unit.ownerId);
              const canSpawnMore = unit.spawnedSkeletonsCount < CREATURE_STATS.cursedCoffin.maxSpawnedSkeletons;
              if (unit.hp >= 2000) unit.phase1Spawned = false;
              if (unit.hp >= 1500) unit.phase2Spawned = false;
              if (unit.hp >= 1000) unit.phase3Spawned = false;
  
              if (unit.hp < 2000 && !unit.phase1Spawned && canSpawnMore && owner) {
                  for (let k = 0; k < 5; k++) if (unit.spawnedSkeletonsCount < CREATURE_STATS.cursedCoffin.maxSpawnedSkeletons) {
                      createTroop(owner, 'goldenSkeletonFromCoffin', { x: unit.x, y: unit.y, parentCoffinId: unit.id });
                      unit.spawnedSkeletonsCount++;
                  }
                  unit.phase1Spawned = true;
              }
              if (unit.hp < 1500 && !unit.phase2Spawned && canSpawnMore && owner) {
                  for (let k = 0; k < 5; k++) if (unit.spawnedSkeletonsCount < CREATURE_STATS.cursedCoffin.maxSpawnedSkeletons) {
                      createTroop(owner, 'goldenSkeletonFromCoffin', { x: unit.x, y: unit.y, parentCoffinId: unit.id });
                      unit.spawnedSkeletonsCount++;
                  }
                  unit.phase2Spawned = true;
              }
              if (unit.hp < 1000 && !unit.phase3Spawned && canSpawnMore && owner) {
                  for (let k = 0; k < 10; k++) if (unit.spawnedSkeletonsCount < CREATURE_STATS.cursedCoffin.maxSpawnedSkeletons) {
                      createTroop(owner, 'goldenSkeletonFromCoffin', { x: unit.x, y: unit.y, parentCoffinId: unit.id });
                      unit.spawnedSkeletonsCount++;
                  }
                  unit.phase3Spawned = true;
              }
              if (unit.hp < 500 && unit.type === 'cursedCoffin') {
                  unit.type = 'aggressiveCursedCoffin';
                  const newStats = CREATURE_STATS.aggressiveCursedCoffin;
                  unit.emoji = newStats.emoji;
                  unit.damage = { ...newStats.damage };
                  unit.originalDamage = { ...newStats.damage };
                  unit.attackCooldownMax = newStats.attackCooldownMax;
                  if (canSpawnMore && owner) for (let k = 0; k < 10; k++) if (unit.spawnedSkeletonsCount < CREATURE_STATS.cursedCoffin.maxSpawnedSkeletons) {
                      createTroop(owner, 'goldenSkeletonFromCoffin', { x: unit.x, y: unit.y, parentCoffinId: unit.id });
                      unit.spawnedSkeletonsCount++;
                  }
              }
          }
  
          if (unit.attackFlashTimer > 0) unit.attackFlashTimer -= delta;
          const ownerLord = (unit.ownerId === lord.id) ? lord : bots.find(b => b.id === unit.ownerId) || lord;
          if (!ownerLord) continue;
  
          if (unit.type === 'coffin' && unit.hp <= 25 && !unit.abilityTriggered) {
              unit.abilityTriggered = true;
              for (let j = 0; j < 3; j++) {
                  createTroop(ownerLord, 'grawSkeleton', { free: true, x: unit.x, y: unit.y });
              }
          }
          if (unit.type === 'monkeyBomb' && unit.hp <= 10 && !unit.abilityTriggered) {
              unit.abilityTriggered = true;
              bombs.push({ id: crypto.randomUUID(), x: unit.x, y: unit.y, timer: 3000, exploded: false, team: unit.team });
              const monkeyStats = CREATURE_STATS.monkey;
              unit.type = 'monkey';
              unit.emoji = monkeyStats.emoji;
              unit.maxHp = monkeyStats.maxHp;
              if (unit.hp > unit.maxHp) unit.hp = unit.maxHp;
              unit.damage = { ...monkeyStats.damage };
              unit.originalDamage = { ...monkeyStats.damage };
          }
  
          let targetX, targetY;
          let speed = baseSpeed;
          let shouldMove = true;
          
          if (unit.ownerId === lord.id) {
              const isRanged = unit.type === 'monkeyArcher' || unit.type === 'dragon' || unit.type === 'trueDragon';
              if (attackMode) {
                  speed = baseSpeed * attackSpeedMultiplier;
                  if (isRanged) {
                      targetX = rangedAttackModeSatellite.x;
                      targetY = rangedAttackModeSatellite.y;
                  } else {
                      const formationTarget = attackFormationTargets.get(unit.id);
                      targetX = formationTarget ? formationTarget.x : attackModeSatellite.x;
                      targetY = formationTarget ? formationTarget.y : attackModeSatellite.y;
                  }
              } else if (isPlayerDefending) {
                  let delayedPos = lordPositionBuffer[0] || { x: ownerLord.x, y: ownerLord.y };
                  targetX = delayedPos.x;
                  targetY = delayedPos.y;
              } else if (holdPositionMode) {
                  shouldMove = false;
              }
          } else {
              targetX = ownerLord.x;
              targetY = ownerLord.y;
          }
  
          if (unit.type === 'demon' || unit.type === 'trueDemon') {
              const unitStats = CREATURE_STATS[unit.type];
              if (unit.jumpProgress > 0) {
                  unit.jumpProgress += delta / 200;
                  unit.x = unit.startX + (unit.jumpTargetX - unit.startX) * unit.jumpProgress;
                  unit.y = unit.startY + (unit.jumpTargetY - unit.startY) * unit.jumpProgress;
  
                  if (unit.jumpProgress >= 1) {
                      unit.jumpProgress = 0;
                      unit.x = unit.jumpTargetX;
                      unit.y = unit.jumpTargetY;
                      
                      const circleBase = {
                          ownerId: unit.id,
                          x: unit.x, y: unit.y, createdAt: now, duration: unitStats.aoeDuration,
                          team: unit.team, damagedUnitsSet: new Set(), type: unit.type
                      };
  
                      if (unit.type === 'trueDemon') {
                          demonDamageCircles.push({ ...circleBase, radius: unitStats.attackRadius, circleType: 'outer' });
                          demonDamageCircles.push({ ...circleBase, radius: unitStats.attackRadiusInner, circleType: 'inner' });
                      } else {
                          demonDamageCircles.push({ ...circleBase, radius: unitStats.attackRadius });
                      }
                  }
                  shouldMove = false;
              } else if (unit.attackCooldown <= 0 && unit.isAttacking) {
                  const auraRadius = 35;
                  let nearestTarget = null;
                  let min_dist_sq = Infinity;
  
                  for (const target of allTargets) {
                      if (target.hp <= 0 || !isEnemy(unit, target) || target.id === unit.id) continue;
                      
                      const dx = target.x - unit.x;
                      const dy = target.y - unit.y;
                      const d_sq = dx * dx + dy * dy;
  
                      let targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || (target.size / 2);
                      const detectionRadius = (unit.size / 2) + targetHitboxRadius + auraRadius;
  
                      if (d_sq < detectionRadius * detectionRadius && d_sq < min_dist_sq) {
                          min_dist_sq = d_sq;
                          nearestTarget = target;
                      }
                  }
  
                  if (nearestTarget) {
                      const dist = Math.sqrt(min_dist_sq);
                      const targetHitboxRadius = CREATURE_STATS[nearestTarget.type]?.hitboxRadius || (nearestTarget.size / 2);
                      const selfHitboxRadius = unit.size / 2;
                      
                      const stopDistance = selfHitboxRadius + targetHitboxRadius - 50;
  
                      unit.startX = unit.x;
                      unit.startY = unit.y;
  
                      if (dist > stopDistance) {
                          const travelDistance = dist - stopDistance;
                          const angle = Math.atan2(nearestTarget.y - unit.y, nearestTarget.x - unit.x);
                          unit.jumpTargetX = unit.x + Math.cos(angle) * travelDistance;
                          unit.jumpTargetY = unit.y + Math.sin(angle) * travelDistance;
                      } else {
                          unit.jumpTargetX = unit.x;
                          unit.jumpTargetY = unit.y;
                      }
                      
                      unit.jumpProgress = 0.01;
                      unit.attackCooldown = unit.attackCooldownMax;
                      shouldMove = false;
                  }
              }
          }
          else if (unit.type === 'ram' && unit.isAttacking) {
              const CHARGE_DURATION = 300;
              const AGGRO_EXTRA_RADIUS = 50;
  
              if (unit.chargeProgress > 0) {
                  unit.chargeProgress += delta / CHARGE_DURATION;
                  unit.x = unit.startX + (unit.chargeTargetX - unit.startX) * unit.chargeProgress;
                  unit.y = unit.startY + (unit.chargeTargetY - unit.startY) * unit.chargeProgress;
  
                  if (unit.chargeProgress >= 1) {
                      unit.chargeProgress = 0;
                      unit.x = unit.chargeTargetX;
                      unit.y = unit.chargeTargetY;
                      
                      const target = allTargets.find(t => t.id === unit.chargeTargetId);
                      if (target && target.hp > 0 && distance(unit, target) < (unit.size/2 + (target.size/2) + 10)) {
                         applyDamage(unit, target);
                      }
                  }
                  shouldMove = false;
              } 
              else if (unit.attackCooldown <= 0) {
                  let nearestTarget = null;
                  let min_dist_sq = Infinity;
  
                  for (const target of allTargets) {
                      if (target.hp <= 0 || !isEnemy(unit, target) || target.id === unit.id) continue;
                      
                      const dx = target.x - unit.x;
                      const dy = target.y - unit.y;
                      const d_sq = dx * dx + dy * dy;
  
                      let targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || (target.size / 2);
                      const detectionRadius = (unit.size / 2) + targetHitboxRadius + AGGRO_EXTRA_RADIUS;
  
                      if (d_sq < detectionRadius * detectionRadius && d_sq < min_dist_sq) {
                          min_dist_sq = d_sq;
                          nearestTarget = target;
                      }
                  }
  
                  if (nearestTarget) {
                      unit.startX = unit.x;
                      unit.startY = unit.y;
                      unit.chargeTargetX = nearestTarget.x;
                      unit.chargeTargetY = nearestTarget.y;
                      unit.chargeTargetId = nearestTarget.id;
                      
                      unit.chargeProgress = 0.01;
                      unit.attackCooldown = unit.attackCooldownMax;
                      shouldMove = false;
                  }
              }
          }
          else if ((unit.type === 'dragon' || unit.type === 'trueDragon') && unit.isAttacking) {
              const stats = CREATURE_STATS[unit.type];
              if (unit.ownerId === lord.id) {
                  const targetAngle = Math.atan2(joystickDirection.y, joystickDirection.x);
                  let angleDiff = targetAngle - unit.fireConeAngle;
                  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
                  unit.fireConeAngle += angleDiff * 0.1;
              }
              if (unit.fireballSpawnCooldown > 0) unit.fireballSpawnCooldown -= delta;
              let targetInCone = false;
              for (const target of allTargets) {
                  if (target.hp <= 0 || !isEnemy(unit, target)) continue;
                  const d = distance(unit, target);
                  if (d < stats.fireTriangleRadius + (target.size/2)) {
                      const angleToTarget = Math.atan2(target.y - unit.y, target.x - unit.x);
                      let angleDifferenceToCone = Math.abs(unit.fireConeAngle - angleToTarget);
                      if (angleDifferenceToCone > Math.PI) angleDifferenceToCone = 2 * Math.PI - angleDifferenceToCone;
                      if (angleDifferenceToCone < stats.fireTriangleAngle / 2) {
                          targetInCone = true;
                          break;
                      }
                  }
              }
              if (targetInCone && unit.fireballSpawnCooldown <= 0) {
                  unit.fireballSpawnCooldown = stats.fireballSpawnCooldownMax;
                  const fireballsToSpawn = (unit.type === 'trueDragon') ? 3 : 1; // ИСПРАВЛЕНО
                  for (let k = 0; k < fireballsToSpawn; k++) {
                      const randomAngleInCone = unit.fireConeAngle + (Math.random() - 0.5) * stats.fireTriangleAngle;
                      dragonFireballs.push({ team: unit.team, type: unit.type, x: unit.x, y: unit.y, angle: randomAngleInCone, speed: stats.fireballSpeed, life: 2000 });
                  }
              }
          }
  
          if (shouldMove) {
              const deltaX = targetX - unit.x;
              const deltaY = targetY - unit.y;
              const distToTarget = Math.hypot(deltaX, deltaY);
              const slowdownRadius = 80;
              let moveSpeed = speed * 0.15;
              if (distToTarget < slowdownRadius) moveSpeed *= (distToTarget / slowdownRadius);
              if (distToTarget > 1) {
                  unit.x += (deltaX / distToTarget) * moveSpeed;
                  unit.y += (deltaY / distToTarget) * moveSpeed;
              }
          }
  
          if (unit.ownerId === lord.id && isPlayerDefending) {
              let boundaryRadius = 175 + Math.floor(Math.max(0, currentTroopSlots - 50) / 25) * 25;
              const distFromLord = distance(unit, ownerLord);
              if (distFromLord > boundaryRadius) {
                  const angleToLord = Math.atan2(ownerLord.y - unit.y, ownerLord.x - unit.x);
                  unit.x += Math.cos(angleToLord) * (distFromLord - boundaryRadius) * 0.1;
                  unit.y += Math.sin(angleToLord) * (distFromLord - boundaryRadius) * 0.1;
              }
          }
  
          if (unit.type !== 'demon' && unit.type !== 'trueDemon' && unit.attackCooldown <= 0 && unit.isAttacking) {
              for (const target of allTargets) {
                  if (target.hp <= 0 || !isEnemy(unit, target)) continue;
                  let targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || target.size / 2;
                  if (distance(unit, target) < (unit.size / 2 + targetHitboxRadius + 5)) {
                      const applySelfDmg = unit.type !== 'hugeBat';
                      applyDamage(unit, target, null, applySelfDmg);
                      unit.attackCooldown = unit.attackCooldownMax || 1000;
                      unit.attackAnimTimer = 300;
                      break;
                  }
              }
          }
  
          if (unit.type === 'monkeyWithSword') {
              if (unit.ownerId === lord.id && (attackMode || holdPositionMode)) {
                  const targetAngle = Math.atan2(joystickDirection.y, joystickDirection.x);
                  let angleDiff = targetAngle - unit.swordAngle;
                  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
                  unit.swordAngle += angleDiff * 0.1;
              }
              if (unit.isAttacking && unit.swordAttackCooldown <= 0) {
                  const swordX = unit.x + Math.cos(unit.swordAngle) * unit.swordDistance;
                  const swordY = unit.y + Math.sin(unit.swordAngle) * unit.swordDistance;
                  for (const target of allTargets) {
                      if (target.hp <= 0 || !isEnemy(unit, target)) continue;
                      if (distance({ x: swordX, y: swordY }, target) < (20 + target.size / 2)) {
                          if (applyDamage(unit, target, CREATURE_STATS.monkeyWithSword.swordDamage, false)) unit.attackFlashTimer = 300;
                          unit.swordAttackCooldown = CREATURE_STATS.monkeyWithSword.swordAttackCooldownMax;
                          break;
                      }
                  }
              }
          }
  
          if (unit.type === 'monkeyArcher') {
              if (unit.ownerId === lord.id && (attackMode || holdPositionMode)) {
                  const targetAngle = Math.atan2(joystickDirection.y, joystickDirection.x);
                  let angleDiff = targetAngle - (unit.bowAngle || 0);
                  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
                  unit.bowAngle = (unit.bowAngle || 0) + angleDiff * 0.1;
              }
              if (unit.isAttacking && unit.attackCooldown <= 0) {
                  const angle = unit.bowAngle || 0;
                  const cosA = Math.cos(-angle), sinA = Math.sin(-angle);
                  for (const target of allTargets) {
                      if (target.hp <= 0 || !isEnemy(unit, target)) continue;
                      const dx = target.x - unit.x, dy = target.y - unit.y;
                      const localX = dx * cosA - dy * sinA, localY = dx * sinA + dy * cosA;
                      const targetRadius = target.size / 2;
                      if (localX > 30 - targetRadius && localX < 30 + 140 + targetRadius && localY > -25 / 2 - targetRadius && localY < 25 / 2 + targetRadius) {
                          if (applyDamage(unit, target, CREATURE_STATS.monkeyArcher.bowDamage, false)) unit.attackFlashTimer = 300;
                          unit.attackCooldown = unit.attackCooldownMax;
                          break;
                      }
                  }
              }
          }
  
          for (const other of troops) {
              if (unit === other || other.hp <= 0) continue;
              const d = distance(unit, other);
              const min_d = (unit.size + other.size) / 2 + 2;
              if (d > 0 && d < min_d) {
                  const push = (min_d - d) / 2;
                  const angle = Math.atan2(unit.y - other.y, unit.x - other.x);
                  unit.x += Math.cos(angle) * push; unit.y += Math.sin(angle) * push;
                  other.x -= Math.cos(angle) * push; other.y -= Math.sin(angle) * push;
              }
          }
          const staticObstacles = [...towers, ...statues];
          for (const obstacle of staticObstacles) {
              const stats = CREATURE_STATS[obstacle.type];
              if (!stats || !stats.hitboxRadius) continue;
              const d = distance(unit, obstacle);
              const min_d = (unit.size / 2) + stats.hitboxRadius;
              if (d > 0 && d < min_d) {
                  const push = (min_d - d);
                  const angle = Math.atan2(unit.y - obstacle.y, unit.x - obstacle.x);
                  unit.x += Math.cos(angle) * push;
                  unit.y += Math.sin(angle) * push;
              }
          }
      }
  
      for (let i = troops.length - 1; i >= 0; i--) {
          const unit = troops[i];
          if (unit.hp <= 0) {
              if (unit.team === 'player' && unit.type !== 'grawSkeleton' && unit.type !== 'bloodySkeletonFromCoffin') {
                  currentTroopSlots = Math.max(0, currentTroopSlots - (unit.slotCost || 0));
              }
              if (unit.parentCoffinId) {
                  const parentCoffin = troops.find(t => t.id === unit.parentCoffinId);
                  if (parentCoffin && parentCoffin.spawnedSkeletonsCount > 0) {
                      parentCoffin.spawnedSkeletonsCount--;
                  }
              }
              if (!unit.abilityTriggered) {
                  const owner = (unit.ownerId === lord.id) ? lord : bots.find(b => b.id === unit.ownerId);
                  if (unit.type === 'monkeyBomb') {
                      bombs.push({ id: crypto.randomUUID(), x: unit.x, y: unit.y, timer: 3000, exploded: false, team: unit.team });
                  } else if (unit.type === 'coffin') {
                      for (let j = 0; j < 3; j++) if (owner) createTroop(owner, 'grawSkeleton', { free: true, x: unit.x, y: unit.y });
                  } else if (unit.type === 'ram') {
                      for (let j = 0; j < 2; j++) {
                          if (owner) createTroop(owner, 'monkey', { free: true, x: unit.x, y: unit.y });
                      }
                  }
              }
              troops.splice(i, 1);
          }
      }
      for (let i = towers.length - 1; i >= 0; i--) {
          const t = towers[i];
          if (t.hp <= 0) {
              if (t.team === 'player') {
                  if (t.type === 'tombstone') tombstonePlaced = false;
                  if (t.type === 'house') {
                      const houseStats = CREATURE_STATS.house.levels;
                      let slotsToRemove = 0;
                      for (let j = 0; j <= t.level; j++) slotsToRemove += houseStats[j].troopSlotsIncrease;
                      MAX_TROOPS_SLOTS = Math.max(100, MAX_TROOPS_SLOTS - slotsToRemove);
                  }
              }
              towers.splice(i, 1);
          }
      }
    }
  
    // --- ИСПРАВЛЕНО: Обновление подбираемых предметов (монеты, мешки) ---
    // --- ИСПРАВЛЕНО: Логика подбора предметов ---
    function updatePickupables(delta) {
      const allPickupables = [...coinsOnMap.filter(c => c.visible), ...droppedGolds];
  
      // --- НОВАЯ ЛОГИКА: Столкновение монет со статуями ---
      for (const coin of coinsOnMap) {
          if (!coin.visible) continue;
          for (const statue of statues) {
              const stats = CREATURE_STATS[statue.type];
              if (!stats || !stats.hitboxRadius) continue;
  
              const d = distance(coin, statue);
              const min_d = (coin.width / 2) + stats.hitboxRadius; // Используем hitbox статуи
  
              if (d > 0 && d < min_d) {
                  const push = (min_d - d);
                  const angle = Math.atan2(coin.y - statue.y, coin.x - statue.x);
                  coin.x += Math.cos(angle) * push;
                  coin.y += Math.sin(angle) * push;
              }
          }
      }
  
      // Физика столкновений для всех подбираемых предметов (между собой)
      for (let i = 0; i < allPickupables.length; i++) {
          for (let j = i + 1; j < allPickupables.length; j++) {
              const itemA = allPickupables[i];
              const itemB = allPickupables[j];
              if (distance(itemA, itemB) < 32) {
                  const push = (32 - distance(itemA, itemB)) / 2;
                  const angle = Math.atan2(itemA.y - itemB.y, itemA.x - itemB.x);
                  itemA.x += Math.cos(angle) * push; itemA.y += Math.sin(angle) * push;
                  itemB.x -= Math.cos(angle) * push; itemB.y -= Math.sin(angle) * push;
              }
          }
      }
  
      // ЛОГИКА 1: Подбор обычных монет (могут все)
      const allCollectors = [lord, ...bots, ...troops.filter(t => t.hp > 0)];
      for (let i = coinsOnMap.length - 1; i >= 0; i--) {
          const coin = coinsOnMap[i];
          if (!coin.visible) continue;
          for (const collector of allCollectors) {
              if (distance(coin, collector) < (collector.size / 2) + 10) {
                  const receiver = collector.team === 'player' ? lord : (bots.find(b => b.id === collector.ownerId) || collector);
                  if (receiver.id === 'player') updateGoldDisplay(coin.value);
                  else receiver.gold += coin.value;
                  coinsOnMap.splice(i, 1);
                  break; 
              }
          }
      }
  
      // ЛОГИКА 2: Подбор мешков с золотом (могут только Лорды)
      const lordCollectors = [lord, ...bots];
      for (let i = droppedGolds.length - 1; i >= 0; i--) {
          const drop = droppedGolds[i];
          if (drop.pickupDelay > 0) {
              drop.pickupDelay -= delta;
              continue;
          }
          for (const collector of lordCollectors) {
               if (distance(drop, collector) < (collector.size / 2) + 10) {
                  if (collector.id === 'player') updateGoldDisplay(drop.value);
                  else collector.gold += drop.value;
                  droppedGolds.splice(i, 1);
                  break;
              }
          }
      }
    }
  
    // --- НОВАЯ ФУНКЦИЯ: Притягивание монет к статуям ---
    function updateCoinAttraction(delta) {
        const attractionSpeed = 0.5 * (delta / 16); // Скорость притяжения
  
        for (const coin of coinsOnMap) {
            if (!coin.visible) continue;
  
            for (const statue of statues) {
                const statueStats = CREATURE_STATS[statue.type];
                if (!statueStats) continue;
  
                const attractionRadius = 250; // Радиус, в котором статуя начинает притягивать
                const stopRadius = (statueStats.hitboxRadius || 40) + 5; // Дистанция, на которой монета останавливается
                
                const d = distance(coin, statue);
  
                // Если монета в зоне притяжения, но не слишком близко
                if (d < attractionRadius && d > stopRadius) {
                    const angle = Math.atan2(statue.y - coin.y, statue.x - coin.x);
                    coin.x += Math.cos(angle) * attractionSpeed;
                    coin.y += Math.sin(angle) * attractionSpeed;
                }
            }
        }
    }
  
    // --- НОВАЯ ФУНКЦИЯ: Спавн и удаление монет вокруг Лорда ---
    function updateLordCoinSpawning(delta, scale) {
        // 1. Таймер спавна
        lordCoinSpawnTimer -= delta;
        if (lordCoinSpawnTimer <= 0) {
            lordCoinSpawnTimer = 1000; // ИСПРАВЛЕНО: Спавним 1 монету каждую секунду
  
            const lordCoinsCount = coinsOnMap.filter(c => c.spawnedBy === 'lord').length;
  
            if (lordCoinsCount < MAX_LORD_COINS) {
                // Рассчитываем радиус "за экраном"
                const outOfViewRadius = Math.hypot(canvas.width / 2, canvas.height / 2) / scale + 50;
  
                // Спавним 1 монету
                const angle = Math.random() * Math.PI * 2;
                const x = lord.x + Math.cos(angle) * outOfViewRadius;
                const y = lord.y + Math.sin(angle) * outOfViewRadius;
  
                coinsOnMap.push({
                    id: crypto.randomUUID(), x, y,
                    width: 32, height: 32, value: 5,
                    visible: true, spawnedBy: 'lord' // Помечаем, что монета от лорда
                });
            }
        }
  
        // 2. Удаление слишком далеких монет
        const despawnRadius = Math.hypot(canvas.width, canvas.height) / scale; // Еще дальше
        for (let i = coinsOnMap.length - 1; i >= 0; i--) {
            const coin = coinsOnMap[i];
            if (coin.spawnedBy === 'lord' && distance(lord, coin) > despawnRadius) {
                coinsOnMap.splice(i, 1);
            }
        }
    }
    
      // --- НОВЫЕ ФУНКЦИИ ДЛЯ СТАТУЙ ---
  
    function createStatues() {
      statues.length = 0; // Очищаем массив перед созданием новых
      const MIN_SPAWN_RADIUS = 500; // Минимальное расстояние от центра (0,0)
  
      // Спавним 15 статуй '🗿'
      const stoneStatueStats = CREATURE_STATS.statue;
      for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          // Спавним в пределах мира, но не слишком близко к центру
          const distance = MIN_SPAWN_RADIUS + Math.random() * (WORLD_RADIUS - MIN_SPAWN_RADIUS);
          statues.push({
              id: `stone_statue_${i}`,
              type: 'statue',
              emoji: stoneStatueStats.emoji,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              size: stoneStatueStats.size,
              spawnTimer: Math.random() * stoneStatueStats.spawnCooldown,
              spawnedCoins: 0,
          });
      }
  
      // Спавним 5 статуй '🗽'
      const libertyStatueStats = CREATURE_STATS.statueLiberty;
      for (let i = 0; i < 5; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = MIN_SPAWN_RADIUS + Math.random() * (WORLD_RADIUS - MIN_SPAWN_RADIUS);
          statues.push({
              id: `liberty_statue_${i}`,
              type: 'statueLiberty', // Используем новый тип
              emoji: libertyStatueStats.emoji,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              size: libertyStatueStats.size,
              spawnTimer: Math.random() * libertyStatueStats.spawnCooldown,
              spawnedCoins: 0,
          });
      }
    }
  
    function updateStatues(delta) {
      for (const statue of statues) {
          // >>> НАЧАЛО ИЗМЕНЕНИЙ ДЛЯ ОПТИМИЗАЦИИ <<<
          // Пропускаем обработку статуй, которые очень далеко от игрока или его войск
          let isPlayerOrTroopNearby = distance(statue, lord) < PROCESSING_RADIUS;
          if (!isPlayerOrTroopNearby) {
              for (const troop of troops) {
                  if (troop.team === 'player' && distance(statue, troop) < PROCESSING_RADIUS) {
                      isPlayerOrTroopNearby = true;
                      break;
                  }
              }
          }
  
          if (!isPlayerOrTroopNearby) {
              continue; // Пропускаем обновление, если рядом никого нет
          }
          // >>> КОНЕЦ ИЗМЕНЕНИЙ ДЛЯ ОПТИМИЗАЦИИ <<<
  
          const statueStats = CREATURE_STATS[statue.type];
          if (!statueStats) continue; 
  
          statue.spawnTimer -= delta;
  
          let currentCoins = coinsOnMap.filter(c => c.originStatueId === statue.id).length;
  
          if (statue.spawnTimer <= 0 && currentCoins < statueStats.maxCoins) {
              statue.spawnTimer = statueStats.spawnCooldown;
  
              // ИЗМЕНЕНО: Гарантируем, что монеты спавнятся СНАРУЖИ хитбокса статуи
              const minSpawnDist = (statueStats.hitboxRadius || 40) + 10; // Минимальная дистанция = хитбокс + 10
              const maxSpawnDist = statueStats.coinSpawnRadius;
              const angle = Math.random() * Math.PI * 2;
              // Случайная дистанция в промежутке от минимальной до максимальной
              const dist = minSpawnDist + Math.random() * (maxSpawnDist - minSpawnDist); 
              
              const x = statue.x + Math.cos(angle) * dist;
              const y = statue.y + Math.sin(angle) * dist;
  
              coinsOnMap.push({
                  id: crypto.randomUUID(),
                  x, y,
                  width: 32, height: 32,
                  value: 5,
                  visible: true,
                  respawnTimer: 0,
                  originStatueId: statue.id
              });
          }
      }
    }
    
    function drawStatues(cameraX, cameraY, scale) {
       for (const statue of statues) {
          const screenX = canvas.width / 2 + (statue.x - cameraX) * scale;
          const screenY = canvas.height / 2 + (statue.y - cameraY) * scale;
  
          // Тень
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.beginPath();
          ctx.ellipse(screenX, screenY + statue.size/2 * scale, statue.size/2 * scale, statue.size/6 * scale, 0, 0, Math.PI*2);
          ctx.fill();
  
          // Сама статуя
          ctx.font = `${statue.size * scale}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(statue.emoji, screenX, screenY);
       }
    }
  
    // --- Отрисовка ---
    function drawTextWithOutline(text, x, y, fontSize = 14, color = 'white') {
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.strokeText(text, x, y);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }



    
    function drawUnit(unit, cameraX, cameraY, scale) {
        const screenX = canvas.width / 2 + (unit.x - cameraX) * scale;
        const screenY = canvas.height / 2 + (unit.y - cameraY) * scale;
    
        let offsetX = 0;
        let offsetY = 0;
        
        if (unit.damageShakeTimer > 0) {
            const shakeProgress = 1 - (unit.damageShakeTimer / 300);
            offsetX += Math.sin(shakeProgress * Math.PI * 4) * 3 * scale;
        }
    
        if (unit.attackAnimTimer > 0) {
            const jiggleProgress = 1 - (unit.attackAnimTimer / 300);
            offsetY += Math.sin(jiggleProgress * Math.PI * 2) * 2 * scale;
    
            if (unit.type === 'skeleton') {
                const phase = Math.floor(unit.attackAnimTimer / 50) % 2 === 0 ? 1 : -1;
                const lungeAmount = 3 * phase * scale;
                if (unit.facing === 'left') offsetX += -lungeAmount;
                else if (unit.facing === 'right') offsetX += lungeAmount;
                else if (unit.facing === 'up') offsetY += -lungeAmount;
                else offsetY += lungeAmount;
            } else if (unit.type === 'demon' || unit.type === 'trueDemon') {
                if (unit.jumpTimer > 0) {
                    offsetY += -26 * scale * Math.sin((unit.jumpTimer / 390) * Math.PI);
                }
            }
        }
        
        ctx.save();
        
        const unitStats = CREATURE_STATS[unit.type];
        if (unitStats && unitStats.opacity) {
            ctx.globalAlpha = unitStats.opacity;
        }
    
        // Тень рисуем всегда
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(screenX + offsetX, screenY + unit.size / 2 * scale + offsetY, unit.size / 2 * scale, unit.size / 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
    
        const isPlayerTroop = unit.team === 'player' && unit.ownerId === lord.id;
    
        // Сохраняем текущее состояние контекста для прозрачности
        ctx.save(); 
    
        // Проверяем, является ли это юнитом игрока в режиме защиты
        if (isPlayerDefending && isPlayerTroop) {
            // Устанавливаем прозрачность для всего, что будет нарисовано дальше
            ctx.globalAlpha = 0.5; 
        }
    
        // --- ✅ ИСПРАВЛЕННАЯ ЛОГИКА ОПРЕДЕЛЕНИЯ ИЗОБРАЖЕНИЯ ---
        let imageToDraw = unitStats.image; // По умолчанию берем картинку из статов
    
        // Особый случай для обычного гроба: если ХП низкое, меняем картинку
        if (unit.type === 'coffin' && unit.hp <= 25) {
            imageToDraw = CoffinImage2;
        }
        // --- КОНЕЦ ИСПРАВЛЕННОЙ ЛОГИКИ ОПРЕДЕЛЕНИЯ ИЗОБРАЖЕНИЯ ---
    
        // Проверяем, есть ли у юнита картинка для отрисовки
        if (imageToDraw && imageToDraw.complete && imageToDraw.naturalHeight !== 0) {
            // Рисуем картинку (она будет полупрозрачной, если сработал globalAlpha)
            const w = unit.size * scale;
            const h = unit.size * scale;
            ctx.drawImage(imageToDraw, screenX + offsetX - w / 2, screenY + offsetY - h / 2, w, h);
        } else {
            // Если картинки нет, рисуем эмодзи
            ctx.font = `${unit.size * scale}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (unit.type === 'monkeyBomb') {
                ctx.fillText('🐵', screenX + offsetX, screenY + offsetY);
                ctx.font = `${28 * scale}px monospace`;
                ctx.fillText('💣', screenX + offsetX + (5 * scale), screenY + offsetY + (20 * scale));
            } else {
                // Рисуем обычный эмодзи
                ctx.fillText(unit.emoji, screenX + offsetX, screenY + offsetY);
            }
        }
    
        // Возвращаем контекст в исходное состояние (сбрасываем globalAlpha)
        ctx.restore(); 
        
        ctx.restore();
    
        let hpColor = 'white';
        if (unit.hpChangeData && performance.now() - unit.hpChangeData.time < 300) {
            if (unit.hpChangeData.type === 'gain') hpColor = 'lime';
            else if (unit.hpChangeData.type === 'loss') hpColor = 'red';
        } else if (unit.hpChangeData) {
            unit.hpChangeData = null;
        }
    
    if (unit.type === 'monkeyWithSword') {
            const swordSize = 25 * scale;
            const swordX = screenX + Math.cos(unit.swordAngle) * unit.swordDistance * scale;
            const swordY = screenY + Math.sin(unit.swordAngle) * unit.swordDistance * scale;
            ctx.save();
            ctx.translate(swordX, swordY);
            ctx.rotate(unit.swordAngle);
            ctx.fillStyle = (unit.attackFlashTimer && unit.attackFlashTimer > 0) ? 'rgba(255, 0, 0, 0.4)' : 'rgba(128, 128, 128, 0.3)';
    
            const rectWidth = 40 * scale;
            const rectHeight = 25 * scale;
            ctx.fillRect(0, -rectHeight / 2, rectWidth, rectHeight);
            ctx.restore();
            ctx.save();
            ctx.translate(swordX, swordY);
            ctx.rotate(unit.swordAngle + Math.PI / 4 + Math.PI);
            ctx.font = `${swordSize}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🗡️', 0, 0);
            ctx.restore();
        } else if (unit.type === 'monkeyArcher') {
            const bowSize = 25 * scale;
            const angle = unit.bowAngle || 0;
            
            ctx.save();
            ctx.translate(screenX, screenY);
            ctx.rotate(angle);
            ctx.fillStyle = (unit.attackFlashTimer && unit.attackFlashTimer > 0) ? 'rgba(255, 0, 0, 0.4)' : 'rgba(128, 128, 128, 0.3)';
            const rectWidth = 140 * scale;
            const rectHeight = 25 * scale;
            const rectOffset = 30 * scale;
            ctx.fillRect(rectOffset, -rectHeight / 2, rectWidth, rectHeight);
            ctx.restore();
    
            const bowX = screenX + Math.cos(angle) * 20 * scale;
            const bowY = screenY + Math.sin(angle) * 20 * scale;
            ctx.save();
            ctx.translate(bowX, bowY);
            ctx.rotate(angle + Math.PI / 4);
            ctx.font = `${bowSize}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🏹', 0, 0);
            ctx.restore();
        }
        
        // --- START OF UNIFIED DRAWING LOGIC FOR UNIT INFO (HP, BARS, etc.) ---
        
        const hpText = `${unit.hp}/${unit.maxHp}`;
        const hpTextY = screenY - unit.size / 1.2 * scale + offsetY;
    
        // Case 1: Cursed Coffin (most complex UI)
        if (unit.type === 'cursedCoffin' || unit.type === 'aggressiveCursedCoffin') {
            const barWidth = 80 * scale;
            const barHeight = 10 * scale;
            const barX = screenX + offsetX - barWidth / 2;
            const barY = screenY - unit.size / 1.2 * scale + offsetY;
            
            ctx.fillStyle = '#333';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            
            const hpPercent = unit.hp / unit.maxHp;
            ctx.fillStyle = '#8B0000';
            ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
            
            ctx.fillStyle = 'black';
            for (let i = 1; i < 5; i++) {
                ctx.fillRect(barX + (barWidth / 5) * i - (1 * scale), barY, 2 * scale, barHeight);
            }
            
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2 * scale;
            ctx.strokeRect(barX, barY, barWidth, barHeight);
            
            // Draw HP text above the bar
            drawTextWithOutline(hpText, screenX + offsetX, barY - 10 * scale, 14 * scale, hpColor);
    
            // Draw skeleton limit text below the bar
            const skeletonLimitText = `${unit.spawnedSkeletonsCount}/${CREATURE_STATS.cursedCoffin.maxSpawnedSkeletons}`;
            drawTextWithOutline(skeletonLimitText, screenX + offsetX, barY + barHeight + 10 * scale, 14 * scale, 'red');
    
        // Case 2: Huge Bat (Rage bar + HP)
        } else if (unit.type === 'hugeBat') {
            const rageBarY = hpTextY - 15 * scale; // Position rage bar above HP text
            const barWidth = 40 * scale;
            const barHeight = 6 * scale;
            const barX = screenX + offsetX - barWidth / 2;
    
            // Draw HP text first
            drawTextWithOutline(hpText, screenX + offsetX, hpTextY, 14 * scale, hpColor);
    

    // Draw the rage bar above the HP text
            ctx.fillStyle = '#555';
            ctx.fillRect(barX, rageBarY, barWidth, barHeight);
            const ragePercent = unit.rageBites / 15;
            ctx.fillStyle = 'red';
            ctx.fillRect(barX, rageBarY, barWidth * ragePercent, barHeight);
            ctx.fillStyle = 'black';
            ctx.fillRect(barX + (barWidth / 3) - 1, rageBarY, 2 * scale, barHeight);
            ctx.fillRect(barX + (2 * barWidth / 3) - 1, rageBarY, 2 * scale, barHeight);
    
    
    ctx.strokeStyle = 'black';
            ctx.lineWidth = 1 * scale;
            ctx.strokeRect(barX, rageBarY, barWidth, barHeight);
            
        // Case 3: Zombie Leader (Rage bar + HP)
        } else if (unit.type === 'zombieLeader') {
            const rageBarY = hpTextY - 15 * scale; // Position rage bar above HP text
            const segWidth = 8 * scale;
            const segHeight = 8 * scale;
            const spacing = 2 * scale;
            const totalWidth = (segWidth * 5) + (spacing * 4);
            const startX = screenX + offsetX - totalWidth / 2;
            
            // Draw HP text first
            drawTextWithOutline(hpText, screenX + offsetX, hpTextY, 14 * scale, hpColor);
    
            // Draw rage segments above the HP text
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = i < unit.rage ? '#00e600' : '#444';
                ctx.fillRect(startX + i * (segWidth + spacing), rageBarY, segWidth, segHeight);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1 * scale;
                ctx.strokeRect(startX + i * (segWidth + spacing), rageBarY, segWidth, segHeight);
            }
    
        // Default Case: All other units (just HP)
        } else {
            drawTextWithOutline(hpText, screenX + offsetX, hpTextY, 14 * scale, hpColor);
        }
        // --- END OF UNIFIED DRAWING LOGIC ---
      }


    function drawLord(lordObj, cameraX, cameraY, scale) {
      const screenX = canvas.width / 2 + (lordObj.x - cameraX) * scale;
      const screenY = canvas.height / 2 + (lordObj.y - cameraY) * scale;
  
      // Тень
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(screenX, screenY + lordObj.size/2 * scale, lordObj.size/2 * scale, lordObj.size/6 * scale, 0, 0, Math.PI*2);
      ctx.fill();
  
      // Эмодзи лорда

  // Проверяем, есть ли картинка и загрузилась ли она
  if (lordObj.image && lordObj.image.complete) {
    // Рассчитываем размеры и позицию картинки, чтобы она была центрирована
    const imgWidth = lordObj.size * scale;
    const imgHeight = lordObj.size * scale; // Можно использовать другое соотношение, если картинка не квадратная
    const imgX = screenX - imgWidth / 2;
    const imgY = screenY - imgHeight / 2;

    // Рисуем изображение
    ctx.drawImage(lordObj.image, imgX, imgY, imgWidth, imgHeight);

  } else {
    // Если картинки нет или она не загрузилась, рисуем старый эмодзи
    ctx.font = `${lordObj.size * scale}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(lordObj.emoji  , screenX, screenY); //  '?' на случай, если и эмодзи нет
  }

      // --- ОБНОВЛЕННАЯ РАМКА ЗДОРОВЬЯ И КОМАНДЫ ---
      const frameWidth = 80 * scale;
      const frameHeight = 12 * scale;
      const frameX = screenX - frameWidth / 2;
      const frameY = screenY - (lordObj.size / 2 + 25) * scale;
  
      // Фон рамки
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(frameX, frameY, frameWidth, frameHeight);
  
      // Индикатор команды (кружок)
      const indicatorRadius = frameHeight * 0.4;
      const indicatorX = frameX + indicatorRadius + (frameHeight * 0.2); // С отступом
      const indicatorY = frameY + frameHeight / 2;
  
      switch(lordObj.team) {
          case 'player': ctx.fillStyle = '#2cfa1a'; break; // Яркий зеленый
          case 'bot1': ctx.fillStyle = '#fa1a1a'; break; // Яркий красный
          case 'bot2': ctx.fillStyle = '#fa951a'; break; // Яркий оранжевый
          case 'bot3': ctx.fillStyle = '#f554e8'; break; // Яркий розовый
          case 'bot4': ctx.fillStyle = '#fafa1a'; break; // Яркий желтый
          case 'bot5': ctx.fillStyle = '#1a95fa'; break; // Яркий голубой
          default: ctx.fillStyle = 'gray';
      }
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, indicatorRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();
  
      // Полоска здоровья и текст
      const hpBarX = indicatorX + indicatorRadius + (frameHeight * 0.2);
      const hpBarWidth = frameWidth - (hpBarX - frameX) - (frameHeight * 0.2);
      const hpBarHeight = frameHeight * 0.7;
      const hpBarY = frameY + (frameHeight - hpBarHeight) / 2;
  
      // Фон полоски здоровья
      ctx.fillStyle = '#555';
      ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
  
      // Текущее здоровье
      const hpPercent = Math.max(0, lordObj.hp / lordObj.maxHp);
      let barFillColor;
      if (hpPercent > 0.5) {
          barFillColor = '#2cfa1a'; // Зеленый
      } else if (hpPercent > 0.2) {
          barFillColor = '#fafa1a'; // Желтый
      } else {
          barFillColor = '#fa1a1a'; // Красный
      }
      ctx.fillStyle = barFillColor;
      ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPercent, hpBarHeight);
      
      // Цифровое отображение здоровья
      const hpText = `${lordObj.hp}/${lordObj.maxHp}`;
      ctx.font = `bold ${10 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      // Накладываем тень для читаемости
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.fillText(hpText, hpBarX + hpBarWidth / 2, hpBarY + hpBarHeight / 2 + (1*scale)); // +1 для центровки
      ctx.shadowBlur = 0; // Сбрасываем тень
  
      // Обводка всей рамки
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(frameX, frameY, frameWidth, frameHeight);
      
      // Имя персонажа над рамкой
      drawTextWithOutline(lordObj.name, screenX, frameY - 10 * scale, 16 * scale, 'white');
    }
    function drawTower(tower, cameraX, cameraY, scale) {
        let offsetX = 0;
        // Логика дрожания здания при получении урона
        if (tower.damageShakeTimer > 0) {
            const shakeProgress = 1 - (tower.damageShakeTimer / 300);
            offsetX += Math.sin(shakeProgress * Math.PI * 4) * 3 * scale;
        }

        const screenX = canvas.width / 2 + (tower.x - cameraX) * scale + offsetX; // Применяем смещение
        const screenY = canvas.height / 2 + (tower.y - cameraY) * scale;


        // Тень
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.ellipse(screenX, screenY + tower.size / 2 * scale, tower.size / 2 * scale, tower.size / 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // --- ЛОГИКА ОТРИСОВКИ ЗДАНИЯ (PNG или Emoji) ---
        const stats = CREATURE_STATS[tower.type];
        const levelStats = stats ? stats.levels[tower.level] : null;

        if (levelStats && levelStats.image && levelStats.image.complete && levelStats.image.naturalHeight !== 0) {
            // Рисуем PNG изображение
            const w = tower.size * scale;
            const h = tower.size * scale;
            ctx.drawImage(levelStats.image, screenX - w / 2, screenY - h / 2, w, h);
        } else {
            // Фоллбэк на эмодзи, если изображения нет
            ctx.font = `${tower.size * scale}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = (tower.type === 'tower' && tower.shotVisualTimer > 0) ? 'red' : 'white';
            ctx.fillText(tower.emoji, screenX, screenY);
        }

        // Индикатор команды
        const indicatorRadius = 12 * scale;
        const indicatorY = screenY - (tower.size / 2 + 15) * scale;
        const indicatorX = screenX - 25 * scale;
        switch (tower.team) {
            case 'player': ctx.fillStyle = 'lime'; break;
            case 'bot1': ctx.fillStyle = 'red'; break;
            case 'bot2': ctx.fillStyle = 'orange'; break;
            case 'bot3': ctx.fillStyle = 'pink'; break;
            case 'bot4': ctx.fillStyle = '#e6e600'; break; // Желтый
            case 'bot5': ctx.fillStyle = '#00bfff'; break; // Голубой
            default: ctx.fillStyle = 'gray';
        }
        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, indicatorRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1 * scale;
        ctx.stroke();

        // Здоровье
        let hpColor = 'white';
        if (tower.hpChangeData && performance.now() - tower.hpChangeData.time < 300) {
            if (tower.hpChangeData.type === 'loss') hpColor = 'red';
            else if (tower.hpChangeData.type === 'gain') hpColor = 'lime';
        } else if (tower.hpChangeData) {
            tower.hpChangeData = null;
        }
        drawTextWithOutline(`${tower.hp}hp`, screenX, screenY - tower.size / 1.2 * scale, 18 * scale, hpColor);

        // БЛОК ОТРИСОВКИ ЗВЕЗДЫ УРОВНЯ 
        // Получаем все нужные данные из статистики текущего уровня
        const currentLevelStats = CREATURE_STATS[tower.type].levels[tower.level];
        const levelImage = currentLevelStats?.imageLevel;
        const levelEmoji = currentLevelStats?.levelEmoji;
        const levelSize = currentLevelStats?.sizeLevel; // Получаем размер звезды

        // Проверяем, есть ли картинка для уровня и загружена ли она
        if (levelImage && levelImage.complete && levelImage.naturalHeight !== 0 && levelSize) {
            const starDrawSize = levelSize * scale;
            // Позиционируем звезду справа вверху от здания для наглядности

        const starX = screenX + (tower.size / 2) * scale - (starDrawSize / 2) - tower.size*0.5;
        const starY = screenY - (tower.size / 2) * scale - (starDrawSize / 2) - tower.size*0.7;


            // Рисуем картинку с заданным размером
            ctx.drawImage(levelImage, starX, starY, starDrawSize, starDrawSize);

        } else if (levelEmoji) { // Если картинки нет, рисуем эмодзи, как и раньше
            const levelEmojiY = screenY - (tower.size / 2 + 35) * scale; // Выше индикатора команды
            drawTextWithOutline(levelEmoji, screenX, levelEmojiY, 18 * scale);
        }
    }
    
    function drawTrees(cameraX, cameraY, scale) {
      const startX = Math.floor((cameraX - canvas.width/(2*scale))/200)*200;
      const startY = Math.floor((cameraY - canvas.height/(2*scale))/200)*200;
  
      ctx.font = `${32 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0b3d00';
  
      for(let x = startX - 200; x < cameraX + canvas.width/(2*scale) + 200; x += 200) {
        for(let y = startY - 200; y < cameraY + canvas.height/(2*scale) + 200; y += 200) {
          const rx = x + 20 * Math.sin(y*0.01);
          const ry = y + 20 * Math.cos(x*0.01);
          ctx.fillText('🌳', canvas.width/2 + (rx - cameraX) * scale, canvas.height/2 + (ry - cameraY) * scale);
        }
      }
    }
    function drawCoins(cameraX, cameraY, scale) {
      ctx.font = `${32 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'gold';
  
      for(const coin of coinsOnMap) {
        if(!coin.visible) continue;
        const screenX = canvas.width/2 + (coin.x - cameraX) * scale;
        const screenY = canvas.height/2 + (coin.y - cameraY) * scale;
        ctx.fillText('🪙', screenX, screenY);
      }
    }
    function drawDroppedGold(cameraX, cameraY, scale) {
      ctx.font = `${28 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'gold';
  
      for(const drop of droppedGolds) {
        const screenX = canvas.width/2 + (drop.x - cameraX) * scale;
        const screenY = canvas.height/2 + (drop.y - cameraY) * scale;
        ctx.fillText('🪙', screenX, screenY);
      }
    }
    // --- Рисуем кружок урона демона ---
    function drawDemonDamageCircles(cameraX, cameraY, scale) {
      const nowTime = performance.now();
      for(const circle of demonDamageCircles) {
        const age = nowTime - circle.createdAt;
        if(age > circle.duration) continue;
  
        const alpha = 1 - age / circle.duration;
        const screenX = canvas.width/2 + (circle.x - cameraX) * scale;
        const screenY = canvas.height/2 + (circle.y - cameraY) * scale;
        
        let fillColor = `rgba(180, 0, 0, ${0.1 * alpha})`; 
        let shadowColor = `rgba(150, 0, 0, ${0.5 * alpha})`;
  
        // Выбираем цвет для Истинного Демона в зависимости от типа круга
        if (circle.type === 'trueDemon') {
            if (circle.circleType === 'inner') { // Внутренний круг (более яркий)
                fillColor = `rgba(220, 0, 0, ${0.1 * alpha})`; // 90% прозрачности
                shadowColor = `rgba(200, 40, 40, ${0.5 * alpha})`;
            } else { // Внешний круг (более темный)
                fillColor = `rgba(139, 0, 0, ${0.1 * alpha})`; // 90% прозрачности (ИСПРАВЛЕНО)
                shadowColor = `rgba(180, 0, 0, ${0.3 * alpha})`;
            }
        }
  
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 15 * scale;
        ctx.arc(screenX, screenY, circle.radius * scale, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  
    // --- Рисуем бомбы ---
              function drawBombs(cameraX, cameraY, scale, bombsToDraw = bombs) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      for (const bomb of bombsToDraw) {
        const screenX = canvas.width / 2 + (bomb.x - cameraX) * scale;
        const screenY = canvas.height / 2 + (bomb.y - cameraY) * scale;
  
        if (!bomb.exploded) {
          ctx.font = `${32 * scale}px monospace`;
          ctx.fillText('💣', screenX, screenY);
  
          const timerNumber = Math.max(0, Math.ceil(bomb.timer / 1000));
          ctx.fillStyle = 'red';
          ctx.font = `bold ${24 * scale}px monospace`;
          ctx.fillText(timerNumber, screenX, screenY - 30 * scale);
        } else if (bomb.damageCircle) {
          const age = performance.now() - bomb.damageCircle.createdAt;
          if (age <= bomb.damageCircle.duration) {
            const alpha = 1 - age / bomb.damageCircle.duration;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 165, 0, ${0.4 * alpha})`; // Оранжевый цвет
            ctx.shadowColor = `rgba(255, 165, 0, ${0.7 * alpha})`;
            ctx.shadowBlur = 20;
            const explosionRadius = CREATURE_STATS.bomb.explosionRadius || 80;
            ctx.arc(screenX, screenY, explosionRadius * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
    }
  
    // --- НОВЫЕ ФУНКЦИИ ДЛЯ СНАРЯДОВ БАШНИ (➡️) ---
    function updateTowerProjectiles(delta) {
      const allTargets = [...troops, ...towers, lord, ...bots];
  
      for (let i = towerProjectiles.length - 1; i >= 0; i--) {
          const proj = towerProjectiles[i];
  
          // 1. Проверка на выход за радиус атаки
          const distFromOrigin = distance(proj, { x: proj.originX, y: proj.originY });
          if (distFromOrigin > proj.maxDistance) {
              towerProjectiles.splice(i, 1);
              continue;
          }
  
          // 2. Движение снаряда
          proj.x += Math.cos(proj.angle) * proj.speed * (delta / 16);
          proj.y += Math.sin(proj.angle) * proj.speed * (delta / 16);
  
          // 3. Проверка столкновения с врагами
          for (const target of allTargets) {
              if (target.hp <= 0 || !isEnemy(proj, target)) continue;
  
              const targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || target.size / 2;
              if (distance(proj, target) < targetHitboxRadius) {
                  // Создаем фиктивного атакующего, чтобы передать урон
                  const attacker = {
                      team: proj.team,
                      isAttacking: true,
                      damage: proj.damage
                  };
                  applyDamage(attacker, target, null, false); // Наносим урон
                  towerProjectiles.splice(i, 1); // Удаляем снаряд
                  break; // Выходим из цикла по целям, так как снаряд исчез
              }
          }
      }
    }
  
    function drawTowerProjectiles(cameraX, cameraY, scale) {
        ctx.font = `${32 * scale}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
  
        for (const proj of towerProjectiles) {
            const screenX = canvas.width / 2 + (proj.x - cameraX) * scale;
            const screenY = canvas.height / 2 + (proj.y - cameraY) * scale;
            
            ctx.save();
            ctx.translate(screenX, screenY);
            ctx.rotate(proj.angle);
            ctx.fillText('➡️', 0, 0);
            ctx.restore();
        }
    }
  
    // --- ОБНОВЛЕННЫЕ ФУНКЦИИ ДЛЯ ВОЛШЕБНОЙ БАШНИ ---
    function updateMagicTowerAttacks(delta) {
      const allTargets = [...troops, ...towers, lord, ...bots];
  
      // 1. Обновление летящих снарядов
      for (let i = magicTowerProjectiles.length - 1; i >= 0; i--) {
          const proj = magicTowerProjectiles[i];
          
          // Функция для создания взрыва
          const createExplosion = () => {
               magicTowerAoeCircles.push({
                  id: crypto.randomUUID(), x: proj.x, y: proj.y,
                  radius: proj.aoeRadius, duration: proj.aoeDuration,
                  damage: proj.damage, team: proj.team,
                  createdAt: performance.now(), damagedUnitsSet: new Set(),
              });
              magicTowerProjectiles.splice(i, 1);
          };
  
          // ПРОВЕРКА: Если снаряд вылетел за радиус атаки, он взрывается
          if (distance(proj, {x: proj.originX, y: proj.originY}) > proj.maxDistance) {
              createExplosion();
              continue; 
          }
  
          const target = allTargets.find(t => t.id === proj.targetId && t.hp > 0);
          if (target) {
              proj.targetX = target.x; // Обновляем последнюю известную позицию цели
              proj.targetY = target.y;
              const dist = distance(proj, target);
              if (dist < proj.speed * (delta / 16)) {
                  createExplosion(); // Снаряд достиг цели и взрывается
              } else {
                  const angle = Math.atan2(target.y - proj.y, target.x - proj.x);
                  proj.x += Math.cos(angle) * proj.speed * (delta / 16);
                  proj.y += Math.sin(angle) * proj.speed * (delta / 16);
              }
          } else {
              // Цель мертва, снаряд летит в последнюю точку и взрывается там
               const dist = distance(proj, {x: proj.targetX, y: proj.targetY});
               if (dist < proj.speed * (delta/16)) {
                   createExplosion(); 
               } else {
                  const angle = Math.atan2(proj.targetY - proj.y, proj.targetX - proj.x);
                  proj.x += Math.cos(angle) * proj.speed * (delta/16);
                  proj.y += Math.sin(angle) * proj.speed * (delta/16);
               }
          }
      }
  
      // 2. Обновление кругов урона (AoE)
      const now = performance.now();
      for (let i = magicTowerAoeCircles.length - 1; i >= 0; i--) {
          const circle = magicTowerAoeCircles[i];
          if (now - circle.createdAt > circle.duration) {
              magicTowerAoeCircles.splice(i, 1);
              continue;
          }
          for (const target of allTargets) {
              if (target.hp <= 0 || !isEnemy(circle, target) || circle.damagedUnitsSet.has(target.id)) continue;
              
              const targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || target.size / 2;
              if (distance(circle, target) < circle.radius + targetHitboxRadius) {
                  const attacker = {
                      type: 'magicTower', team: circle.team, isAttacking: true,
                      damage: { troop: circle.damage, building: circle.damage, lord: circle.damage }
                  };
                  applyDamage(attacker, target, null, false);
                  circle.damagedUnitsSet.add(target.id);
              }
          }
      }
    }
  
    function drawMagicTowerAttacks(cameraX, cameraY, scale) {
        ctx.save();
        ctx.fillStyle = '#00bfff';
        ctx.shadowColor = '#87cefa';
        ctx.shadowBlur = 10 * scale;
        for (const proj of magicTowerProjectiles) {
            const screenX = canvas.width / 2 + (proj.x - cameraX) * scale;
            const screenY = canvas.height / 2 + (proj.y - cameraY) * scale;
            ctx.beginPath();
            ctx.arc(screenX, screenY, 8 * scale, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
  
        const now = performance.now();
        for (const circle of magicTowerAoeCircles) {
            const age = now - circle.createdAt;
            if (age > circle.duration) continue;
            const alpha = 0.5 * (1 - age / circle.duration);
            const screenX = canvas.width / 2 + (circle.x - cameraX) * scale;
            const screenY = canvas.height / 2 + (circle.y - cameraY) * scale;
            ctx.fillStyle = `rgba(0, 191, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(screenX, screenY, circle.radius * scale, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
  
          // --- ОБНОВЛЕННАЯ ФУНКЦИЯ: Отрисовка радиусов атаки башен ---
          function drawAttackRadii(cameraX, cameraY, scale) {
              ctx.save(); 
  
              for (const building of towers) {
                  // Рисуем для всех зданий, у которых есть радиус атаки
                  if (!building.attackRadius) continue;
  
                  const screenX = canvas.width / 2 + (building.x - cameraX) * scale;
                  const screenY = canvas.height / 2 + (building.y - cameraY) * scale;
                  const radius = building.attackRadius * scale;
  
                  // --- Рисуем текущий радиус ---
                  if (building.team === 'player') {
                      ctx.fillStyle = 'rgba(128, 128, 128, 0.15)';
                      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                  } else {
                      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
                      ctx.strokeStyle = 'rgba(255, 100, 100, 0.2)';
                  }
                  ctx.beginPath();
                  ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.lineWidth = 1;
                  ctx.stroke();
  
                  // --- Рисуем радиус ПОСЛЕ улучшения (зеленый круг) ---
                  // Проверяем, что здание выбрано игроком
                  if (nearbyBuilding && building.id === nearbyBuilding.id) {
                      const stats = CREATURE_STATS[building.type]; // Сделано универсальным
                      // Находим характеристики следующего уровня
                      const nextLevelStats = stats.levels[building.level + 1];
  
                      // Если следующий уровень существует и у него есть радиус, рисуем его
                      if (nextLevelStats && nextLevelStats.attackRadius) {
                          const upgradedRadius = nextLevelStats.attackRadius * scale;
                          ctx.beginPath();
                          ctx.fillStyle = 'rgba(0, 255, 0, 0.15)'; // Зеленый для превью
                          ctx.strokeStyle = 'rgba(100, 255, 100, 0.4)';
                          ctx.arc(screenX, screenY, upgradedRadius, 0, Math.PI * 2);
                          ctx.fill();
                          ctx.stroke();
                      }
                  }
              }
              ctx.restore();
          }
  
          // --- НОВЫЕ ФУНКЦИИ ДЛЯ ДРАКОНА ---
  
    function updateDragonFireballs(delta) {
      const allTargets = [...troops, ...towers, lord, ...bots];
  
      for (let i = dragonFireballs.length - 1; i >= 0; i--) {
          const fb = dragonFireballs[i];
          
          // Движение шара
          fb.x += Math.cos(fb.angle) * fb.speed * (delta / 16);
          fb.y += Math.sin(fb.angle) * fb.speed * (delta / 16);
  
          // Проверка времени жизни
          fb.life -= delta;
          if (fb.life <= 0) {
              dragonFireballs.splice(i, 1);
              continue;
          }
  
          // Проверка столкновения с врагами
          for (const target of allTargets) {
              if (target.hp <= 0 || !isEnemy(fb, target)) continue;
  
              const targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || target.size / 2;
              if (distance(fb, target) < targetHitboxRadius + 5 /* радиус шара */) {
                  const attacker = {
                      team: fb.team,
                      type: fb.type, // Используем тип из самого шара ('dragon' или 'redDragon')
                      isAttacking: true
                  };
                  // ИСПРАВЛЕНО: Теперь урон берется из характеристик того дракона, который выстрелил
                  applyDamage(attacker, target, CREATURE_STATS[fb.type].fireballDamage, false);
                  dragonFireballs.splice(i, 1); // Удаляем шар
                  break; // Выходим из цикла по целям
              }
          }
      }
    }
  
    function drawDragonAttackZone(dragon, cameraX, cameraY, scale) {
        const stats = CREATURE_STATS[dragon.type];
        const screenX = canvas.width / 2 + (dragon.x - cameraX) * scale;
        const screenY = canvas.height / 2 + (dragon.y - cameraY) * scale;
        const radius = stats.fireTriangleRadius * scale;
        
        const angle = dragon.fireConeAngle;
        const halfAngle = stats.fireTriangleAngle / 2;
  
        // Вершины треугольника
        const p1 = { x: screenX, y: screenY };
        const p2 = { 
            x: screenX + Math.cos(angle - halfAngle) * radius,
            y: screenY + Math.sin(angle - halfAngle) * radius
        };
        const p3 = {
            x: screenX + Math.cos(angle + halfAngle) * radius,
            y: screenY + Math.sin(angle + halfAngle) * radius
        };
  
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        
        // Добавлена проверка типа дракона для выбора цвета конуса
        if (dragon.type === 'trueDragon') {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Красный цвет для Истинного Дракона
          ctx.strokeStyle = 'rgba(200, 0, 0, 0.4)';
        } else {
          ctx.fillStyle = 'rgba(255, 165, 0, 0.2)'; // Оранжевый для обычного
          ctx.strokeStyle = 'rgba(255, 100, 0, 0.4)';
        }
        
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
  
    function drawDragonFireballs(cameraX, cameraY, scale) {
        ctx.save();
        for (const fb of dragonFireballs) {
            const screenX = canvas.width / 2 + (fb.x - cameraX) * scale;
            const screenY = canvas.height / 2 + (fb.y - cameraY) * scale;
            const alpha = fb.life / 2000; // Плавное исчезновение
            
            ctx.beginPath();
            if (fb.type === 'trueDragon') {
                ctx.fillStyle = `rgba(255, 69, 0, ${0.9 * alpha})`; // Ярко-красно-оранжевый
                ctx.shadowColor = 'rgba(255, 20, 0, 0.9)';
            } else {
                ctx.fillStyle = `rgba(255, 220, 0, ${0.7 * alpha})`; // Оригинальный желто-оранжевый
                ctx.shadowColor = 'rgba(255, 100, 0, 0.8)';
            }
            ctx.shadowBlur = 15 * scale;
            ctx.arc(screenX, screenY, 6 * scale, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
  
    // --- Камера ---
      function getCameraScale() {
      const baseScaleStart = 1.0; // Начнем с масштаба 1.0
      const slotsUsed = currentTroopSlots;
      // ИЗМЕНЕНО: Отдаление происходит за каждые 25 слотов войск
      const portions = Math.floor(slotsUsed / 25); 
      
      // Ограничиваем количество "порций" до 10, чтобы камера не отдалялась бесконечно (25 * 10 = 250 слотов)
      const cappedPortions = Math.min(portions, 10);
  
      const scaleMultiplier = baseScaleStart * (1 - 0.05 * cappedPortions);
      // Минимальный масштаб, чтобы мир не стал слишком мелким
      const finalScale = Math.max(0.4, scaleMultiplier); 
  
      let scale = finalScale;
  
      // Эффект отдаления от спавна демона
      if (demonSpawned && demonSpawnCameraTimer > 0) {
        const zoomOutTargetFactor = 0.8; 
        const progress = demonSpawnCameraTimer / DEMON_SPAWN_CAMERA_DURATION;
        const currentZoomFactor = zoomOutTargetFactor + (1 - zoomOutTargetFactor) * (1 - progress);
        scale *= currentZoomFactor;
      }
  
      return scale;
    }
  
    // --- Обновление лидерборда ---
    function updateLeaderboard() {
      const leaders = [lord, ...bots];
      leaders.sort((a,b) => b.gold - a.gold);
  
      leaderboardList.innerHTML = '';
      for(const leader of leaders) {
        const li = document.createElement('li');
        
        let displayName = 'Player';
        if (leader.isBot) {
            const botNumber = leader.id.replace('bot', '');
            displayName = `BOT ${botNumber}`;
        } else {
            displayName = leader.name || 'Player';
        }
  
        li.textContent = `${leader.emoji} ${displayName}`;
        const goldSpan = document.createElement('span');
        goldSpan.textContent = leader.gold;
        li.appendChild(goldSpan);
        leaderboardList.appendChild(li);
      }
    }
  
    // --- Обработчики кнопок ---
    

  
      buildTowerBtn.addEventListener('click', () => {
      createTower(lord, 'tower');
    });
    buildMagicTowerBtn.addEventListener('click', () => { // ДОБАВЛЕНО
      createTower(lord, 'magicTower');
    });
    buildTombstoneBtn.addEventListener('click', () => {
      createTower(lord, 'tombstone');
    });
    buildHouseBtn.addEventListener('click', () => {
      createTower(lord, 'house');
    });
  
    sellBuildingBtn.addEventListener('click', () => {
        if (!nearbyBuilding) return;
  
        const building = nearbyBuilding;
        const baseStats = CREATURE_STATS[building.type];
        
        // ИЗМЕНЕНО: Динамический расчет стоимости продажи
        let totalInvestment = baseStats.levels[0].cost;
        for (let i = 0; i < building.level; i++) {
            totalInvestment += baseStats.levels[i].upgradeCost;
        }
        const sellValue = Math.ceil(totalInvestment / 2);
  
        updateGoldDisplay(sellValue);
  
        if (building.type === 'house') {
            let slotsToReturn = 0;
            for(let i = 0; i <= building.level; i++) {
                slotsToReturn += baseStats.levels[i].troopSlotsIncrease;
            }
            MAX_TROOPS_SLOTS = Math.max(100, MAX_TROOPS_SLOTS - slotsToReturn);
        }
        if (building.type === 'tombstone' && building.team === 'player') {
            tombstonePlaced = false;
        }
  
        towers.splice(towers.findIndex(t => t.id === building.id), 1);
        nearbyBuilding = null;
    });
  
    repairBuildingBtn.addEventListener('click', () => {
        if (!nearbyBuilding || nearbyBuilding.hp === nearbyBuilding.maxHp) return;
  
        const building = nearbyBuilding;
        const repairCost = CREATURE_STATS[building.type].levels[building.level].repairCost;
  
        if (lord.gold >= repairCost) {
            updateGoldDisplay(-repairCost);
            building.hp = building.maxHp;
            building.hpChangeData = { type: 'gain', time: performance.now() };
        }
    });
  
    upgradeBuildingBtn.addEventListener('click', () => {
        if (!nearbyBuilding) return;
  
        const building = nearbyBuilding;
        const baseStats = CREATURE_STATS[building.type];
        const currentLevel = building.level;
        const currentLevelStats = baseStats.levels[currentLevel];
        const nextLevelStats = baseStats.levels[currentLevel + 1];
  
        if (nextLevelStats && lord.gold >= currentLevelStats.upgradeCost) {
            updateGoldDisplay(-currentLevelStats.upgradeCost);
  
            // Увеличиваем лимит войск ДО изменения уровня
            if (building.type === 'house') {
                MAX_TROOPS_SLOTS = Math.min(1100, MAX_TROOPS_SLOTS + nextLevelStats.troopSlotsIncrease);
            }
  
            // Применяем улучшение
            building.level++;
            building.emoji = nextLevelStats.emoji;
            building.maxHp = nextLevelStats.maxHp;
            building.hp = nextLevelStats.maxHp; // Полное исцеление
            if (nextLevelStats.damage) building.damage = { ...nextLevelStats.damage };
            if (nextLevelStats.attackRadius) building.attackRadius = nextLevelStats.attackRadius;
            if (nextLevelStats.attackSpeed) building.shootCooldownMax = nextLevelStats.attackSpeed;
        }
    });
  
    spawnToggleBtn.addEventListener('click', () => {
      // 1. Переключаем режим
      spawnTroopsMode = !spawnTroopsMode;
  
      // 2. Находим контейнеры с кнопками и кнопку с книгой
      const troopButtonsDiv = document.getElementById('troopButtons');
      const buildButtonsDiv = document.getElementById('buildButtons');
      const toggleSpecialPanelsBtn = document.getElementById('toggleSpecialPanelsBtn');
  
      if (spawnTroopsMode) {
        // РЕЖИМ ВОЙСК (ОБЫЧНЫЙ/ЗЕЛЕНЫЙ)
        troopButtonsDiv.style.display = 'flex';
        buildButtonsDiv.style.display = 'none';
        toggleSpecialPanelsBtn.style.display = 'block'; // Показываем кнопку "📖"
  
        // Возвращаем панели и кнопкам стандартный цвет
        panel.classList.remove('building-mode');
  
      } else {
        // РЕЖИМ СТРОИТЕЛЬСТВА (ГОЛУБОЙ)
        troopButtonsDiv.style.display = 'none';
        buildButtonsDiv.style.display = 'flex';
        toggleSpecialPanelsBtn.style.display = 'none'; // Прячем кнопку "📖"
  
        // Устанавливаем панели и кнопкам голубой цвет
        panel.classList.add('building-mode');
  
        // Скрываем все выдвижные панели (зеленую, фиолетовую и т.д.)
        const allExtraPanels = document.querySelectorAll('.extra-panel');
        allExtraPanels.forEach(p => {
            p.classList.remove('visible');
        });
      }
    });
  
    attackBtn.addEventListener('click', () => {
      // Включаем Атаку, выключаем остальное
      attackMode = true;
      isPlayerDefending = false;
      holdPositionMode = false; 
  
      // Обновляем состояние кнопок
      attackBtn.disabled = true;
      defenseBtn.disabled = false;
      holdPositionBtn.disabled = false;
  
      // Все войска игрока переходят в режим атаки
      troops.forEach(unit => {
        if (unit.ownerId === lord.id && unit.category === 'troop') {
          unit.isAttacking = true; // Разрешаем атаковать
          const stats = CREATURE_STATS[unit.type];
          unit.damage = { ...stats.damage }; // Восстанавливаем полный урон
        }
      });
    });
  
    defenseBtn.addEventListener('click', () => {
      // Включаем Защиту, выключаем остальное
      attackMode = false;
      isPlayerDefending = true;
      holdPositionMode = false;
  
      defenseActivationTime = performance.now(); 
      defenseHealTimer = 0; 
  
      // Обновляем состояние кнопок
      attackBtn.disabled = false;
      defenseBtn.disabled = true;
      holdPositionBtn.disabled = false;
  
      // Все войска игрока переходят в режим защиты
      troops.forEach(unit => {
        if (unit.ownerId === lord.id && unit.category === 'troop') {
          unit.isAttacking = false; // Запрещаем атаковать
          unit.damage = { troop: 0, building: 0, lord: 0 }; // Обнуляем урон
        }
      });
    });
    
    // НОВЫЙ ОБРАБОТЧИК для кнопки "Стоять на месте" (💤)
    holdPositionBtn.addEventListener('click', () => {
      // Включаем "Стоять", выключаем остальное
      attackMode = false;
      isPlayerDefending = false;
      holdPositionMode = true;
  
      // Обновляем состояние кнопок
      attackBtn.disabled = false;
      defenseBtn.disabled = false;
      holdPositionBtn.disabled = true;
  
      // Войска не двигаются, но могут атаковать, если враг подойдет
      troops.forEach(unit => {
        if (unit.ownerId === lord.id && unit.category === 'troop') {
          unit.isAttacking = true; // Разрешаем атаковать
          const stats = CREATURE_STATS[unit.type];
          unit.damage = { ...stats.damage }; // Восстанавливаем полный урон
        }
      });
    });
  
  // --- НОВЫЙ ОБРАБОТЧИК: Смена команды игрока ---
    const teamCycle = ['player', 'bot1', 'bot3']; // Команды для цикла: Зеленые, Красные, Розовые
    teamSwitchBtn.addEventListener('click', () => {
      // Находим текущий индекс команды игрока в цикле
      const currentTeamIndex = teamCycle.indexOf(lord.team);
      // Вычисляем следующий индекс с переходом на начало, если нужно
      const nextTeamIndex = (currentTeamIndex + 1) % teamCycle.length;
      const newTeam = teamCycle[nextTeamIndex];
  
      // Меняем команду у лорда
      lord.team = newTeam;
  
      // Меняем команду у всех существующих войск и зданий игрока
      troops.forEach(t => {
          if (t.ownerId === lord.id) {
              t.team = newTeam;
          }
      });
      towers.forEach(t => {
          if (t.ownerId === lord.id) {
              t.team = newTeam;
          }
      });
  
      // Просто для информации, можно показать в консоли
      console.log(`Игрок перешел в команду: ${newTeam}`);
    });
  
    // --- ИЗМЕНЕНО: ОБРАБОТЧИК ДЛЯ КНОПКИ "КНИГА" ТЕПЕРЬ ОТКРЫВАЕТ ВСЕ ПАНЕЛИ ---
    const toggleSpecialPanelsBtn = document.getElementById('toggleSpecialPanelsBtn');
    toggleSpecialPanelsBtn.addEventListener('click', () => {
        // Собираем все панели, которые нужно открыть/закрыть
        const allExtraPanels = [
            greenTroopsPanel,
            specialTroopsPanel,
            yellowTroopsPanel,
            redTroopsPanel
        ];
        
        // Переключаем класс 'visible' для каждой панели
        allExtraPanels.forEach(panel => {
            if (panel) { // Проверяем, что панель существует
                panel.classList.toggle('visible');
            }
        });
    });
  
    // --- НОВАЯ ЛОГИКА ДЛЯ КНОПКИ "ОТДАТЬ ЗОЛОТО" ---
    dropGoldBtn.addEventListener('click', () => {
        goldDonationPanel.classList.toggle('visible');
    });
  
    goldDonationPanel.addEventListener('click', (e) => {
        if (e.target.classList.contains('donate-btn')) {
            const amount = parseInt(e.target.dataset.amount, 10);
            if (isNaN(amount)) return;
  
            if (lord.gold < amount) {
                showLimitationMessage('Недостаточно золота!');
                flashElementPink(goldCountEl, 300);
                return;
            }
            
            updateGoldDisplay(-amount);
  
            const drop = {
                id: crypto.randomUUID(),
                x: lord.x,
                y: lord.y - 40, // Чуть ниже лорда
                width: 32,
                height: 32,
                value: amount,
                visible: true,
                pickupDelay: 2000, // Задержка перед подбором
            };
            droppedGolds.push(drop);
  
            // Скрываем панель после пожертвования
            goldDonationPanel.classList.remove('visible');
        }
    });
  
  // Обновляем таймер исцеления в режиме защиты
  if (isPlayerDefending) {
    defenseHealTimer += delta;
    if (defenseHealTimer >= DEFENSE_HEAL_INTERVAL) {
      defenseHealTimer = 0; // Сбрасываем таймер после исцеления
    }
  }
  
      // --- Запуск оффлайн игры ---
    function startGameOffline() {
      // Прячем меню и кнопки "Скины" / "Коды"
      menu.style.display = 'none';
      menuOverlay.style.display = 'none';
      document.getElementById('topLeftUI').style.display = 'none';
      document.getElementById('topRightUI').style.display = 'none';
  
      // Показываем игровой интерфейс
      panel.hidden = false;
      joystick.style.display = 'flex';
      leaderboard.style.display = 'block';
      specialTroopsPanel.hidden = false;
  
      createStatues();
  
      discoveredObjects.clear(); // Очищаем "туман войны"
  
      bots.length = 0;
      troops.length = 0;
      towers.length = 0;
      bombs.length = 0;
      currentTroopSlots = 0;
      MAX_TROOPS_SLOTS = 100;
      tombstonePlaced = false;
  
      lordPositionBuffer.length = 0;
  
      const botTeams = ['bot1', 'bot2', 'bot3', 'bot4', 'bot5'];
      for(let i=0; i<5; i++) {
        const bot = {
          id: botTeams[i],
          emoji: CREATURE_STATS.bot.emoji,
          x: lord.x + (Math.random()*400 - 200),
          y: lord.y + (Math.random()*400 - 200),
          size: 48,
          speed: 3,
          gold: 3000, // Золото по умолчанию
          width: 48,
          height: 48,
          facing: 'down',
          isBot: true,
          bonusGiven: false,
          moveDir: {x:0, y:0},
          targetMoveTime: 0,
          hp: CREATURE_STATS.bot.maxHp,
          maxHp: CREATURE_STATS.bot.maxHp,
          category: CREATURE_STATS.bot.category,
          type: 'bot',
          team: botTeams[i],
          lastTowerSpawn: 0,
          isDead: false,
          respawnTimer: 0,
          inCombatTimer: 0, // ДОБАВЛЕНО
        };
        
        // Выдаем спец. ботам больше золота
        if (bot.id === 'bot4') {
            bot.gold = 6000;
        } else if (bot.id === 'bot5') {
            bot.gold = 7500;
        }
        
        bots.push(bot);
  
        if (bot.id === 'bot3') {
          createTroop(bot, 'demon', { free: true });
        } else {
          createInitialBotArmy(bot);
        }
      }
  
      spawnTroopsMode = true;
      spawnToggleBtn.classList.remove('active');
      buildButtonsDiv.hidden = true;
  
      buildTowerBtn.textContent = `🏰 (${CREATURE_STATS.tower.levels[0].cost})`;
      buildTombstoneBtn.textContent = `🪦 (${CREATURE_STATS.tombstone.levels[0].cost})`;
      buildHouseBtn.textContent = `🏚️ (${CREATURE_STATS.house.levels[0].cost})`;
  
      // ИСПРАВЛЕНА ОШИБКА: было CREATURE_STATS.human, что вызывало ошибку. Заменено на CREATURE_STATS.monkey
      summonSkeletonBtn.disabled = lord.gold < CREATURE_STATS.monkey.cost || currentTroopSlots + CREATURE_STATS.monkey.slotCost > MAX_TROOPS_SLOTS;
      summonMonkeyBombBtn.disabled = lord.gold < CREATURE_STATS.monkeyBomb.cost || currentTroopSlots + CREATURE_STATS.monkeyBomb.slotCost > MAX_TROOPS_SLOTS;
      summonDemonBtn.disabled = lord.gold < CREATURE_STATS.demon.cost || currentTroopSlots + 10 > MAX_TROOPS_SLOTS;
      summonBatSpecialBtn.disabled = lord.gold < CREATURE_STATS.bat.cost || currentTroopSlots + 1 > MAX_TROOPS_SLOTS || !tombstonePlaced;
      summonSkeletonSpecialBtn.disabled = lord.gold < CREATURE_STATS.skeleton.cost || currentTroopSlots + 1 > MAX_TROOPS_SLOTS || !tombstonePlaced;
      summonCoffinSpecialBtn.disabled = lord.gold < CREATURE_STATS.coffin.cost || currentTroopSlots + CREATURE_STATS.coffin.slotCost > MAX_TROOPS_SLOTS || !tombstonePlaced;
  
      specialTroopsPanel.hidden = false;
  
      attackMode = false;
      attackBtn.disabled = false;
      defenseBtn.disabled = true;
  
      demonSpawned = false;
      demonSpawnCameraTimer = 0;
    }
  
    btnOffline.addEventListener('click', () => {
      startGameOffline();
    });
  
    btnExit.addEventListener('click', () => {
      location.reload();
    });
    
        // --- Новая функция для обновления бомб ---
    function updateBombs(delta) {
      const now = performance.now();
      for (let i = bombs.length - 1; i >= 0; i--) {
        const bomb = bombs[i];
        
        // Если бомба еще не взорвалась, тикает таймер
        if (!bomb.exploded) {
          bomb.timer -= delta;
          
          // Взрыв!
          if (bomb.timer <= 0) {
            bomb.exploded = true;
            const stats = CREATURE_STATS.bomb;
            // Создаем круг урона, который будет существовать 3 секунды
            bomb.damageCircle = {
              createdAt: now,
              duration: stats.explosionDuration,
              damagedUnitsSet: new Set() // Запоминаем, кого уже ударили
            };
          }
        } 
        // Если бомба взорвалась и круг урона активен
        else if (bomb.damageCircle) {
          const circle = bomb.damageCircle;
          const age = now - circle.createdAt;
  
          // Если круг еще активен, наносим урон
          if (age <= circle.duration) {
            const allTargets = [...troops, ...towers, lord, ...bots];
            for (const target of allTargets) {
              // Пропускаем мертвых, союзников и тех, кого уже ударили этим взрывом
              if (target.hp <= 0 || bomb.team === target.team || circle.damagedUnitsSet.has(target.id)) continue;
              
              const stats = CREATURE_STATS.bomb;
              if (distance(bomb, target) < stats.explosionRadius) {
                const bombAttacker = { ...stats, team: bomb.team, type: 'bomb', isAttacking: true };
                applyDamage(bombAttacker, target);
                circle.damagedUnitsSet.add(target.id); // Запомнить, что ударили
              }
            }
          } else {
            // Если время круга вышло, удаляем бомбу из игры
            bombs.splice(i, 1);
          }
        }
      }
    }
  
      function updateDemonDamageCircles(delta) {
      const now = performance.now();
      for (let i = demonDamageCircles.length - 1; i >= 0; i--) {
          const circle = demonDamageCircles[i];
          
          // ИСПРАВЛЕНО: Находим реального демона, который создал круг
          const originalAttacker = troops.find(t => t.id === circle.ownerId);
          
          // Если демон-создатель еще жив, он наносит урон и получает эффекты
          if (originalAttacker && originalAttacker.hp > 0) {
              const allTargets = [...troops, ...towers, lord, ...bots];
              for (const target of allTargets) {
                  if (target.hp <= 0 || !isEnemy(originalAttacker, target) || circle.damagedUnitsSet.has(target.id)) continue;
  
                  let targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || (target.size / 2);
  
                  if (distance(circle, target) < circle.radius + targetHitboxRadius) {
                      const attackerStats = CREATURE_STATS[originalAttacker.type];
                      let damageProfile = attackerStats.damage;
  
                      if (originalAttacker.type === 'trueDemon') {
                          damageProfile = (circle.circleType === 'inner') ? attackerStats.damageInner : attackerStats.damage;
                      }
                      
                      // Вызываем applyDamage с РЕАЛЬНЫМ атакующим и нужным профилем урона
                      if (applyDamage(originalAttacker, target, damageProfile)) {
                           // Теперь исцеление/урон себе произойдет внутри applyDamage
                           circle.damagedUnitsSet.add(target.id);
                      }
                  }
              }
          }
  
          if (now - circle.createdAt > circle.duration) {
              demonDamageCircles.splice(i, 1);
          }
      }
    }
  
    // --- ИСПРАВЛЕНО: ЛОГИКА АУРЫ ВАМПИРА (версия 3.0) ---
    function updateVampireAuras(delta) {
      const allTargets = [...troops, ...towers, lord, ...bots];
      const vampires = troops.filter(t => t.type === 'vampire' && t.hp > 0);
  
      for (const vampire of vampires) {
          // Инициализируем счетчики-накопители для урона и лечения, если их нет
          vampire.auraHealCounter = vampire.auraHealCounter || 0;
          
          const vampireStats = CREATURE_STATS.vampire;
          let enemiesInAura = 0;
  
          for (const target of allTargets) {
              if (target.hp <= 0 || !isEnemy(vampire, target)) continue;
              
              // Инициализируем накопитель урона для КАЖДОЙ цели
              target.auraDamageCounter = target.auraDamageCounter || 0;
  
              const targetHitboxRadius = CREATURE_STATS[target.type]?.hitboxRadius || (target.size / 2);
              if (distance(vampire, target) < vampireStats.auraRadius + targetHitboxRadius) {
                  enemiesInAura++; // Считаем врагов для лечения вампира
                  
                  // Определяем урон в секунду для этой цели
                  const damagePerSecond = vampireStats.auraDamage[target.category] || 0;
  
                  // Накапливаем урон для цели
                  target.auraDamageCounter += (damagePerSecond * delta) / 1000;
                  
                  // Если накопился 1 или более урона, наносим его ЦЕЛЫМ числом
                  if (target.auraDamageCounter >= 1) {
                      const damageToApply = Math.floor(target.auraDamageCounter);
                      
                      target.hp -= damageToApply;
                      if (target.hp < 0) target.hp = 0;
                      
                      if (target.category === 'troop' || target.category === 'building' || target.category === 'lord') {
                          target.hpChangeData = { type: 'loss', time: performance.now() };
                      }
                      
                      // Вычитаем нанесенный урон из накопителя
                      target.auraDamageCounter -= damageToApply;
                  }
              }
          }
  
          // Логика лечения вампира (остается такой же, она была правильной)
          if (enemiesInAura > 0) {
              const potentialHeal = (enemiesInAura * vampireStats.auraHeal * delta) / 1000;
              vampire.auraHealCounter += potentialHeal;
  
              if (vampire.auraHealCounter >= 1) {
                  const healAmount = Math.floor(vampire.auraHealCounter);
                  
                  if (vampire.hp < vampire.maxHp) {
                      vampire.hp += healAmount;
                      if (vampire.hp > vampire.maxHp) vampire.hp = vampire.maxHp;
                      vampire.hpChangeData = { type: 'gain', time: performance.now() };
                  }
                  
                  vampire.auraHealCounter -= healAmount;
              }
          }
      }
    }
  
    // --- ИСПРАВЛЕНО: ОТРИСОВКА АУРЫ ВАМПИРА ---
    function drawVampireAuras(cameraX, cameraY, scale) {
      const vampires = troops.filter(t => t.type === 'vampire' && t.hp > 0);
      if (vampires.length === 0) return;
  
      ctx.save();
      // Сделали ауру более прозрачной (было 0.2, стало 0.1)
      const auraColor = 'rgba(180, 0, 0, 0.1)'; 
      const shadowColor = 'rgba(139, 0, 0, 0.2)'; // Тень тоже сделали прозрачнее
      ctx.fillStyle = auraColor;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 10 * scale;
  
      for (const vampire of vampires) {
          const screenX = canvas.width / 2 + (vampire.x - cameraX) * scale;
          const screenY = canvas.height / 2 + (vampire.y - cameraY) * scale;
          const radius = CREATURE_STATS.vampire.auraRadius * scale;
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          ctx.fill();
      }
      ctx.restore();
    }
  
    // --- НОВАЯ ФУНКЦИЯ: Атака зданий ---
    function updateBuildingAttacks(delta) {
      const allTargets = [...troops, ...towers, lord, ...bots];
  
      for (const building of towers) {
          if (building.hp <= 0) continue;
  
          building.shootCooldown = Math.max(0, building.shootCooldown - delta);
          if (building.shootCooldown > 0) continue;
  
          const stats = CREATURE_STATS[building.type];
          if (!stats || !stats.levels) continue;
          
          const levelStats = stats.levels[building.level];
          if (!levelStats.attackRadius || !levelStats.attackSpeed) continue;
  
          let bestTarget = null;
          let minDistanceSq = Infinity;
  
          // Ищем ближайшего врага в радиусе атаки
          for (const target of allTargets) {
              if (target.hp <= 0 || !isEnemy(building, target)) continue;
  
              const dSq = (target.x - building.x)**2 + (target.y - building.y)**2;
              if (dSq < building.attackRadius**2 && dSq < minDistanceSq) {
                  minDistanceSq = dSq;
                  bestTarget = target;
              }
          }
  
          if (bestTarget) {
              building.shootCooldown = levelStats.attackSpeed;
  
              // Атака обычной башни
              if (building.type === 'tower') {
                  const angle = Math.atan2(bestTarget.y - building.y, bestTarget.x - building.x);
                  towerProjectiles.push({
                      originX: building.x,
                      originY: building.y,
                      x: building.x,
                      y: building.y,
                      angle: angle,
                      speed: 25, // ИЗМЕНЕНО
                      maxDistance: building.attackRadius,
                      team: building.team,
                      damage: building.damage
                  });
                  building.shotVisualTimer = 100;
              } 
              // Атака магической башни
              else if (building.type === 'magicTower') {
                   magicTowerProjectiles.push({
                      id: crypto.randomUUID(),
                      originX: building.x,
                      originY: building.y,
                      x: building.x,
                      y: building.y,
                      targetId: bestTarget.id,
                      targetX: bestTarget.x,
                      targetY: bestTarget.y,
                      speed: 8, // ИЗМЕНЕНО
                      maxDistance: building.attackRadius,
                      aoeRadius: levelStats.aoeRadius,
                      aoeDuration: levelStats.aoeDuration,
                      damage: levelStats.damage,
                      team: building.team
                  });
              }
          }
      }
    }
  
    function drawDragonAttackZone(dragon, cameraX, cameraY, scale) {
        const stats = CREATURE_STATS[dragon.type];
        const screenX = canvas.width / 2 + (dragon.x - cameraX) * scale;
        const screenY = canvas.height / 2 + (dragon.y - cameraY) * scale;
        const radius = stats.fireTriangleRadius * scale;
        
        const angle = dragon.fireConeAngle;
        const halfAngle = stats.fireTriangleAngle / 2;
  
        // Вершины треугольника
        const p1 = { x: screenX, y: screenY };
        const p2 = { 
            x: screenX + Math.cos(angle - halfAngle) * radius,
            y: screenY + Math.sin(angle - halfAngle) * radius
        };
        const p3 = {
            x: screenX + Math.cos(angle + halfAngle) * radius,
            y: screenY + Math.sin(angle + halfAngle) * radius
        };
  
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        
        // Добавлена проверка типа дракона для выбора цвета конуса
        if (dragon.type === 'trueDragon') { // <--- ВОТ ИСПРАВЛЕНИЕ
          ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Красный цвет для Истинного Дракона
          ctx.strokeStyle = 'rgba(200, 0, 0, 0.4)';
        } else {
          ctx.fillStyle = 'rgba(255, 165, 0, 0.2)'; // Оранжевый для обычного
          ctx.strokeStyle = 'rgba(255, 100, 0, 0.4)';
        }
        
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    
          // --- НОВАЯ ФУНКЦИЯ: Рисуем хитбоксы в режиме строительства ---
    function drawPlacementAids(cameraX, cameraY, scale) {
        if (spawnTroopsMode) return; // Рисуем только в режиме строительства
  
        // Рисуем зеленые хитбоксы существующих зданий
        ctx.globalAlpha = 0.4; // Делаем круги полупрозрачными
        ctx.fillStyle = 'green';
        for (const building of towers) {
          // ---- ИЗМЕНЕНИЕ ----
          // Пропускаем отрисовку зеленого круга для выбранного здания,
          // так как для него будет мигать желтый круг.
          if (nearbyBuilding && building.id === nearbyBuilding.id && blinkingAlpha > 0) {
              continue;
          }
          // ---- КОНЕЦ ИЗМЕНЕНИЯ ----
  
          const radius = (CREATURE_STATS[building.type].hitboxRadius || 30) * scale;
          const screenX = canvas.width / 2 + (building.x - cameraX) * scale;
          const screenY = canvas.height / 2 + (building.y - cameraY) * scale;
  
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
  
        // Рисуем круг-индикатор под игроком
        const playerCircleRadius = 45 * scale; // ИЗМЕНЕНО: Радиус увеличен до 45
        const playerScreenX = canvas.width / 2 + (lord.x - cameraX) * scale;
        const playerScreenY = canvas.height / 2 + (lord.y - cameraY) * scale;
        
        // Цвет зависит от того, можно ли строить
        ctx.fillStyle = isPlacementBlocked ? 'red' : 'deepskyblue';
  
        ctx.beginPath();
        ctx.arc(playerScreenX, playerScreenY, playerCircleRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1.0; // Возвращаем нормальную прозрачность
    }
  
    // --- НОВАЯ ФУНКЦИЯ: Отрисовка мигающего выделения для выбранного здания ---
    function drawSelectionHighlight(cameraX, cameraY, scale) {
      // Если здание не выбрано или анимация не активна, ничего не делаем
      if (!nearbyBuilding || blinkingAlpha <= 0) return;
  
      const building = nearbyBuilding;
      const stats = CREATURE_STATS[building.type];
      // Убедимся, что у здания есть хитбокс
      if (!stats || !stats.hitboxRadius) return;
  
      // Рассчитываем позицию и радиус на экране
      const screenX = canvas.width / 2 + (building.x - cameraX) * scale;
      const screenY = canvas.height / 2 + (building.y - cameraY) * scale;
      const radius = stats.hitboxRadius * scale;
  
      // Рисуем полупрозрачный желтый круг
      ctx.fillStyle = `rgba(255, 255, 0, ${blinkingAlpha})`; // Желтый цвет с мигающей прозрачностью
      
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  
    // --- НОВАЯ ФУНКЦИЯ: Отрисовка эффекта низкого здоровья ---
    function drawLowHpEffect() {
      if (lord.hp < lord.maxHp / 2) {
        // Создаем пульсирующий эффект для прозрачности
        const alpha = 0.2 + Math.sin(performance.now() / 300) * 0.1;
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        const barWidth = 25; // Ширина полос
  
        // Верхняя полоса
        ctx.fillRect(0, 0, canvas.width, barWidth);
        // Нижняя полоса
        ctx.fillRect(0, canvas.height - barWidth, canvas.width, barWidth);
        // Левая полоса
        ctx.fillRect(0, 0, barWidth, canvas.height);
        // Правая полоса
        ctx.fillRect(canvas.width - barWidth, 0, barWidth, canvas.height);
      }
    }
  
    // Функция для позиционирования панели информации о здании
    function positionInfoPanel(building, cameraX, cameraY, scale) {
        const infoPanel = document.getElementById('buildingInfoPanel');
        if (!infoPanel) return;
  
        // ПРЯЧЕМ ПАНЕЛЬ, ЕСЛИ НЕ В РЕЖИМЕ СТРОИТЕЛЬСТВА
        if (spawnTroopsMode) {
            if (infoPanel.style.opacity !== '0') {
                infoPanel.style.opacity = '0';
                setTimeout(() => { infoPanel.style.display = 'none'; }, 150);
            }
            return;
        }
  
        if (!building || building.hp <= 0) {
            if (infoPanel.style.opacity !== '0') {
                infoPanel.style.opacity = '0';
                setTimeout(() => {
                    if (!nearbyBuilding) {
                        infoPanel.style.display = 'none';
                    }
                }, 150);
            }
            return;
        }
  
        if (infoPanel.style.display !== 'block') {
            infoPanel.style.display = 'block';
        }
  
        const internalScreenX = (canvas.width / 2) + (building.x - cameraX) * scale;
        const internalScreenY = (canvas.height / 2) + (building.y - cameraY) * scale;
  
        const clientRect = canvas.getBoundingClientRect();
        const ratioX = clientRect.width / canvas.width;
        const ratioY = clientRect.height / canvas.height;
  
        const cssScreenX = internalScreenX * ratioX;
        const cssScreenY = internalScreenY * ratioY;
  
        const buildingStats = CREATURE_STATS[building.type];
        const panelWidth = infoPanel.offsetWidth;
        const panelHeight = infoPanel.offsetHeight;
        const buildingRadiusInCSS = (buildingStats.hitboxRadius || building.size / 2) * scale * ratioY;
        const VERTICAL_OFFSET = 10;
  
        let newLeft = clientRect.left + cssScreenX - (panelWidth / 2);
        let newTop = clientRect.top + cssScreenY - buildingRadiusInCSS - panelHeight - VERTICAL_OFFSET;
  
        if (newLeft < 5) newLeft = 5;
        if (newTop < 5) newTop = 5;
        if (newLeft + panelWidth > window.innerWidth - 5) {
            newLeft = window.innerWidth - panelWidth - 5;
        }
        if (newTop + panelHeight > window.innerHeight - 5) {
            newTop = clientRect.top + cssScreenY + buildingRadiusInCSS + 5;
        }
  
        infoPanel.style.left = `${newLeft}px`;
        infoPanel.style.top = `${newTop}px`;
        infoPanel.style.transform = 'none';
  
        if (infoPanel.style.opacity !== '1') {
            infoPanel.style.opacity = '1';
        }
    }
  
    // --- ДОБАВЛЕНО: Логика для панели информации о войсках ---
  
    // Ссылки на DOM-элементы панели
    const troopInfoPanel = {
        panel: document.getElementById('troopInfoPanel'),
        name: document.getElementById('troopInfoName'),
        cost: document.getElementById('troopInfoCost'),
        hp: document.getElementById('troopInfoHP'),
        slots: document.getElementById('troopInfoSlots'),
        damageRow: document.getElementById('troopInfoDamageRow'),
        damage: document.getElementById('troopInfoDamage'),
        attackSpeedRow: document.getElementById('troopInfoAttackSpeedRow'),
        attackSpeed: document.getElementById('troopInfoAttackSpeed'),
        hpLossRow: document.getElementById('troopInfoHpLossRow'),
        hpLoss: document.getElementById('troopInfoHpLoss'),
        description: document.getElementById('troopInfoDescription')
    };
  
    // Функция, чтобы спрятать панель
    function hideTroopInfo() {
        if (troopInfoPanel.panel.style.opacity !== '0') {
            troopInfoPanel.panel.style.opacity = '0';
            setTimeout(() => { troopInfoPanel.panel.style.display = 'none'; }, 150);
        }
    }
  
    function showTroopInfo(troopType, buttonEl) {
        const stats = CREATURE_STATS[troopType];
        if (!stats) return;
  
        const lang = currentLanguage;
        const currentTranslations = translations[lang];
  
        // Берем имя и описание из объекта переводов
        const unitNameKey = `unit_name_${troopType}`;
        const unitDescKey = `unit_desc_${troopType}`;
        const unitName = currentTranslations[unitNameKey] || troopType;
        const unitDescription = currentTranslations[unitDescKey] || '';
  
        troopInfoPanel.name.textContent = `${stats.emoji} ${unitName}`;
        troopInfoPanel.cost.innerHTML = `💰 <span>${stats.cost}</span>`;
        const initialHp = stats.baseHp !== undefined ? stats.baseHp : stats.maxHp;
        troopInfoPanel.hp.innerHTML = `❤️ <span>${initialHp} / ${stats.maxHp}</span>`;
        troopInfoPanel.slots.innerHTML = `👥 <span>${stats.slotCost}</span>`;
  
        // Показываем основной урон, если он есть
        if (stats.damage) {
            const damageText = `${stats.damage.troop} / ${stats.damage.building} / ${stats.damage.lord}`;
            troopInfoPanel.damage.textContent = damageText;
            troopInfoPanel.damageRow.style.display = 'flex';
        } else {
            troopInfoPanel.damageRow.style.display = 'none';
        }
  
        // Скорость атаки
        const attackSpeed = stats.attackCooldownMax || stats.swordAttackCooldownMax || 1000;
        troopInfoPanel.attackSpeed.innerHTML = `⏱️ <span>${(attackSpeed / 1000).toFixed(1)} сек</span>`;
        
        // Потеря или лечение здоровья при атаке
        if (stats.hpLossOnAttack !== undefined && stats.hpLossOnAttack !== 0) {
            if (stats.hpLossOnAttack > 0) {
                troopInfoPanel.hpLoss.innerHTML = `🩸 <span>Теряет ${stats.hpLossOnAttack} HP</span>`;
            } else {
                troopInfoPanel.hpLoss.innerHTML = `💚 <span>Лечит ${-stats.hpLossOnAttack} HP</span>`;
            }
            troopInfoPanel.hpLossRow.style.display = 'flex';
        } else {
            troopInfoPanel.hpLossRow.style.display = 'none';
        }
        
        // Устанавливаем описание
        troopInfoPanel.description.textContent = unitDescription;
        troopInfoPanel.description.style.display = unitDescription ? 'block' : 'none';
  
        // Показываем панель
        troopInfoPanel.panel.style.display = 'block';
        setTimeout(() => {
            troopInfoPanel.panel.style.opacity = '1';
        }, 10);
    }
  
    // --- НОВАЯ ЛОГИКА ДЛЯ КНОПОК СПАВНА (КОРОТКОЕ НАЖАТИЕ / УДЕРЖАНИЕ) ---
    const troopButtons = [
      { el: summonSkeletonBtn, type: 'monkey' },
      { el: summonMonkeyBombBtn, type: 'monkeyBomb' },
      { el: summonMonkeyWithSwordBtn, type: 'monkeyWithSword' },
      { el: summonArcherBtn, type: 'monkeyArcher' },
      { el: summonRamBtn, type: 'ram' },
      { el: summonDragonBtn, type: 'dragon' },
      { el: summonDemonBtn, type: 'demon' },
      // Легендарные войска с новыми именами
      { el: summonGoldenSkeletonBtn, type: 'goldenSkeleton' },
      { el: summonCursedCoffinBtn, type: 'cursedCoffin' },
      { el: summonHugeBatBtn, type: 'hugeBat' },
      { el: summonTrueDragonBtn, type: 'trueDragon' },
      { el: summonTrueDemonBtn, type: 'trueDemon' },
      // Войска с надгробия
      { el: summonSkeletonSpecialBtn, type: 'skeleton' },
      { el: summonZombieLeaderSpecialBtn, type: 'zombieLeader'}, // ДОБАВЛЕНО
      { el: summonGhostSpecialBtn, type: 'ghost' },
      { el: summonBatSpecialBtn, type: 'bat' },
      { el: summonCoffinSpecialBtn, type: 'coffin' },
      { el: summonVampireSpecialBtn, type: 'vampire' }
    ];
  
    troopButtons.forEach(buttonInfo => {
      if (!buttonInfo.el) return;
  
      let pressTimer = null;
      let isLongPress = false;
  
      const startPress = (e) => {
        e.preventDefault();
        isLongPress = false;
        pressTimer = setTimeout(() => {
          isLongPress = true;
          showTroopInfo(buttonInfo.type, buttonInfo.el);
        }, 1500); // 1.5 секунды для удержания
      };
  
      const endPress = (e) => {
        e.preventDefault();
        clearTimeout(pressTimer);
        if (!isLongPress) {
          // Это короткое нажатие - спавним юнита
          if (spawnTroopsMode) {
             // ИЗМЕНЕНИЕ: Добавлен параметр, указывающий, что спавн инициирован игроком
             const troopCreated = createTroop(lord, buttonInfo.type, { spawnedByPlayerClick: true });
             if((buttonInfo.type === 'demon' || buttonInfo.type === 'dragon' || buttonInfo.type === 'trueDragon') && troopCreated) {
                  demonSpawned = true;
                  demonSpawnCameraTimer = DEMON_SPAWN_CAMERA_DURATION;
             }
          }
        }
        // В любом случае прячем панель
        hideTroopInfo();
      };
  
      // Привязываем события
      buttonInfo.el.addEventListener('mousedown', startPress);
      buttonInfo.el.addEventListener('mouseup', endPress);
      buttonInfo.el.addEventListener('mouseleave', () => {
          clearTimeout(pressTimer);
          hideTroopInfo();
      });
  
      buttonInfo.el.addEventListener('touchstart', startPress, { passive: false });
      buttonInfo.el.addEventListener('touchend', endPress);
      buttonInfo.el.addEventListener('touchcancel', () => {
          clearTimeout(pressTimer);
          hideTroopInfo();
      });
    });
    
    // --- КОНЕЦ БЛОКА ДЛЯ ПАНЕЛИ ИНФОРМАЦИИ ---
  
  
    // --- Основной цикл ---
    let lastTime = performance.now();
    function gameLoop(time) {
      const delta = time - lastTime;
      lastTime = time;
  
      // --- НОВАЯ ЛОГИКА: Проверка, не мертв ли игрок ---
      if (playerIsDead) {
          // Если игрок мертв, мы не обновляем игру, просто ждем перезапуска
          requestAnimationFrame(gameLoop);
          return;
      }
  
      if (menu.style.display !== 'none') {
          requestAnimationFrame(gameLoop);
          return;
      }
  
      // --- НОВАЯ ЛОГИКА: Проверка на поражение ---
      if (lord.hp <= 0 && !playerIsDead) {
          playerIsDead = true;
  
          // Удаляем все войска и здания игрока
          for (let i = troops.length - 1; i >= 0; i--) {
              if (troops[i].ownerId === lord.id) {
                  troops.splice(i, 1);
              }
          }
          for (let i = towers.length - 1; i >= 0; i--) {
              if (towers[i].ownerId === lord.id) {
                  towers.splice(i, 1);
              }
          }
  
          // Скрываем весь игровой интерфейс
          document.getElementById('uiContainer').style.display = 'none';
          document.getElementById('joystick').style.display = 'none';
          document.getElementById('leaderboardContainer').style.display = 'none';
          document.getElementById('goldDisplay').style.display = 'none';
          document.getElementById('troopCountDisplay').style.display = 'none';
          document.getElementById('minimapCanvas').style.display = 'none';
          document.getElementById('minimapToggleBtn').style.display = 'none';
          document.getElementById('buildingActionsPanel').style.display = 'none';
          
          // Показываем экран поражения
          const deathScreen = document.getElementById('deathScreen');
          deathScreen.style.display = 'flex';
          setLanguage(currentLanguage); // Обновляем текст на экране поражения
          
          // Добавляем обработчик на кнопку перезапуска
          document.getElementById('restartBtn').addEventListener('click', () => {
              location.reload(); // Перезагружаем страницу
          });
  
          // Останавливаем дальнейшее выполнение цикла
          requestAnimationFrame(gameLoop);
          return;
      }
  
  
      if (demonSpawnCameraTimer > 0) {
          demonSpawnCameraTimer -= delta;
          if (demonSpawnCameraTimer < 0) demonSpawnCameraTimer = 0;
      }
  
      // Обновляем таймеры боя у лордов
      [lord, ...bots].forEach(l => {
          if (l.inCombatTimer > 0) {
              l.inCombatTimer -= delta;
          }
      });
  
      // --- Обновление всех игровых объектов ---
      updateLord();
  
      // --- ДОБАВЛЕНО: РЕГЕНЕРАЦИЯ ЗДОРОВЬЯ ЛОРДА ---
      lord.regenTimer += delta;
      if (lord.regenTimer >= 1000) {
          lord.regenTimer -= 1000;
          if (lord.hp < lord.maxHp) {
              lord.hp += 1;
          }
      }
      
      if (isPlayerDefending) {
          // Новая логика: Лечение лорда на 10 ХП каждые 3 секунды
          lord.defenseRegenTimer += delta;
          if (lord.defenseRegenTimer >= 3000) {
              lord.defenseRegenTimer -= 3000; // Сбрасываем таймер
              if (lord.hp < lord.maxHp) {
                  lord.hp = Math.min(lord.maxHp, lord.hp + 10);
              }
          }
  
          // Старая логика: Лечение войск
          defenseHealTimer += delta;
          if (defenseHealTimer >= DEFENSE_HEAL_INTERVAL) {
              defenseHealTimer %= DEFENSE_HEAL_INTERVAL;
              troops.forEach(unit => {
                  if (unit.ownerId === lord.id && unit.hp > 0 && unit.hp < unit.maxHp) {
                      unit.hp += 1;
                      if (unit.hp > unit.maxHp) unit.hp = unit.maxHp;
                      unit.hpChangeData = { type: 'gain', time: performance.now() };
                  }
              });
          }
      }
  
      // --- НОВАЯ ЛОГИКА: Обнаружение ближайшего здания и управление панелью действий ---
      const PROXIMITY_RADIUS = 75;
      let foundBuilding = null;
      // Ищем ближайшее здание только если мы в режиме строительства
      if (!spawnTroopsMode) {
          let closestDist = PROXIMITY_RADIUS;
          for (const building of towers) {
              if (building.team !== 'player' || building.hp <= 0) continue;
              const d = distance(lord, building);
              if (d < closestDist) {
                  closestDist = d;
                  foundBuilding = building;
              }
          }
      }
      nearbyBuilding = foundBuilding;
  
      // Показываем или прячем новую панель с кнопками
      if (nearbyBuilding) {
          buildingActionsPanel.classList.add('visible');
      } else {
          buildingActionsPanel.classList.remove('visible');
      }
  
      if (nearbyBuilding) {
          updateBuildingInfoPanel(nearbyBuilding);
          const cycleDuration = 3000;
          const timeInCycle = time % cycleDuration;
          const minAlpha = 0.4;
          const maxAlpha = 0.8;
          blinkingAlpha = minAlpha + (Math.sin(timeInCycle / cycleDuration * 2 * Math.PI) + 1) / 2 * (maxAlpha - minAlpha);
      } else {
          blinkingAlpha = 0;
      }
  
      updateBots(delta);
      updateTroops(delta);
      updateStatues(delta);
      updatePickupables(delta);
      updateCoinAttraction(delta); 
      updateBombs(delta);
      updateDemonDamageCircles(delta);
      updateVampireAuras(delta);
      updateBuildingAttacks(delta);
      updateTowerProjectiles(delta);
      updateMagicTowerAttacks(delta);
      updateDragonFireballs(delta);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cameraX = lord.x;
      const cameraY = lord.y;
      const scale = getCameraScale();
  
      updateLordCoinSpawning(delta, scale);
  
      positionInfoPanel(nearbyBuilding, cameraX, cameraY, scale);
      updateDiscoveredObjects(cameraX, cameraY, scale);
  
      drawWorldBoundaries(cameraX, cameraY, scale);
      drawTrees(cameraX, cameraY, scale);
      drawAttackRadii(cameraX, cameraY, scale);
  
      for (const unit of troops) {
          if ((unit.type === 'dragon' || unit.type === 'trueDragon') && unit.hp > 0 && unit.ownerId === lord.id) {
              drawDragonAttackZone(unit, cameraX, cameraY, scale);
          }
      }
      drawSelectionHighlight(cameraX, cameraY, scale);
  
      const entitiesToDraw = [
          ...coinsOnMap.filter(c => c.visible).map(o => ({...o, drawFunc: 'coin'})),
          ...droppedGolds.map(o => ({...o, drawFunc: 'droppedGold'})),
          ...statues.map(o => ({...o, drawFunc: 'statue'})),
          ...towers.map(o => ({...o, drawFunc: 'tower'})),
          ...troops.map(o => ({...o, drawFunc: 'unit'})),
          ...bombs.filter(b => !b.exploded).map(o => ({...o, drawFunc: 'bomb'})),
          {...lord, drawFunc: 'lord'},
          ...bots.filter(b => !b.isDead).map(b => ({...b, drawFunc: 'bot'}))
      ];
      entitiesToDraw.sort((a, b) => a.y - b.y);
  
      for(const entity of entitiesToDraw) {
          const entityRadius = (entity.size || 32) * scale * 1.5;
          const screenX = canvas.width / 2 + (entity.x - cameraX) * scale;
          const screenY = canvas.height / 2 + (entity.y - cameraY) * scale;
  
          if (screenX + entityRadius < 0 || screenX - entityRadius > canvas.width ||
              screenY + entityRadius < 0 || screenY - entityRadius > canvas.height) {
              continue;
          }
  
          // --- НОВАЯ ЛОГИКА: Не рисуем лорда игрока, если он мертв ---
          if (entity.id === lord.id && playerIsDead) {
              continue;
          }
  
          switch(entity.drawFunc) {
              case 'coin':
                  ctx.font = `${32 * scale}px monospace`;
                  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'gold';
                  ctx.fillText('🪙', screenX, screenY);
                  break;
              case 'droppedGold':
                  ctx.font = `${28 * scale}px monospace`;
                  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'gold';
                  const emoji = entity.value > 25 ? '💰' : '🪙';
                  ctx.fillText(emoji, screenX, screenY);
                  break;
              case 'tower': drawTower(entity, cameraX, cameraY, scale); break;
              case 'statue': break;
              case 'unit': drawUnit(entity, cameraX, cameraY, scale); break;
              case 'bomb': drawBombs(cameraX, cameraY, scale, [entity]); break;
              case 'lord': case 'bot': drawLord(entity, cameraX, cameraY, scale); break;
          }
      }
      
      drawStatues(cameraX, cameraY, scale);
      drawDemonDamageCircles(cameraX, cameraY, scale);
      drawVampireAuras(cameraX, cameraY, scale);
      drawTowerProjectiles(cameraX, cameraY, scale);
      drawMagicTowerAttacks(cameraX, cameraY, scale);
      drawDragonFireballs(cameraX, cameraY, scale);
      drawBombs(cameraX, cameraY, scale, bombs.filter(b => b.exploded));
      drawPlacementAids(cameraX, cameraY, scale);
      
      // --- ДОБАВЛЕНО: Отрисовка эффекта низкого здоровья ---
      drawLowHpEffect();
  
      if (minimapVisible) {
          drawMinimap(time);
      }
  
      if (spawnTroopsMode) {
          // Обновление состояния кнопок войск
          summonSkeletonBtn.disabled = lord.gold < CREATURE_STATS.monkey.cost || currentTroopSlots + CREATURE_STATS.monkey.slotCost > MAX_TROOPS_SLOTS;
          summonMonkeyBombBtn.disabled = lord.gold < CREATURE_STATS.monkeyBomb.cost || currentTroopSlots + CREATURE_STATS.monkeyBomb.slotCost > MAX_TROOPS_SLOTS;
          summonMonkeyWithSwordBtn.disabled = lord.gold < CREATURE_STATS.monkeyWithSword.cost || currentTroopSlots + CREATURE_STATS.monkeyWithSword.slotCost > MAX_TROOPS_SLOTS;
          summonArcherBtn.disabled = lord.gold < CREATURE_STATS.monkeyArcher.cost || currentTroopSlots + CREATURE_STATS.monkeyArcher.slotCost > MAX_TROOPS_SLOTS;
          summonRamBtn.disabled = lord.gold < CREATURE_STATS.ram.cost || currentTroopSlots + CREATURE_STATS.ram.slotCost > MAX_TROOPS_SLOTS;
          summonDragonBtn.disabled = lord.gold < CREATURE_STATS.dragon.cost || currentTroopSlots + CREATURE_STATS.dragon.slotCost > MAX_TROOPS_SLOTS;
          summonDemonBtn.disabled = lord.gold < CREATURE_STATS.demon.cost || currentTroopSlots + CREATURE_STATS.demon.slotCost > MAX_TROOPS_SLOTS;
  
          // Легендарные
          summonTrueDragonBtn.disabled = lord.gold < CREATURE_STATS.trueDragon.cost || currentTroopSlots + CREATURE_STATS.trueDragon.slotCost > MAX_TROOPS_SLOTS;
          const trueDemonStats = CREATURE_STATS.trueDemon;
          const trueDemonCount = troops.filter(t => t.ownerId === lord.id && t.type === 'trueDemon').length;
          summonTrueDemonBtn.disabled = lord.gold < trueDemonStats.cost || currentTroopSlots + trueDemonStats.slotCost > MAX_TROOPS_SLOTS || trueDemonCount >= trueDemonStats.maxCount;
  
          const tombstone = towers.find(t => t.type === 'tombstone' && t.ownerId === lord.id);
          const tombstoneLevel = tombstone ? tombstone.level : -1;
          const needsTombstone = !tombstone;
  
          // --- ОБНОВЛЕННАЯ И ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ ВСЕХ ВОЙСК С НАДГРОБИЯ ---
  
          // Зомби-вожатый (нужен уровень 0+)
          const zombieLeaderStats = CREATURE_STATS.zombieLeader;
          summonZombieLeaderSpecialBtn.disabled = lord.gold < zombieLeaderStats.cost || currentTroopSlots + zombieLeaderStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 0;
          summonZombieLeaderSpecialBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 0);
          
          // Скелетик (нужен уровень 0+)
          const skeletonStats = CREATURE_STATS.skeleton;
          summonSkeletonSpecialBtn.disabled = lord.gold < skeletonStats.cost || currentTroopSlots + skeletonStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 0;
          summonSkeletonSpecialBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 0);
  
          // Летучая мышь (нужен уровень 1+)
          const batStats = CREATURE_STATS.bat;
          summonBatSpecialBtn.disabled = lord.gold < batStats.cost || currentTroopSlots + batStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 1;
          summonBatSpecialBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 1);
          
          // Призрак (нужен уровень 1+)
          const ghostStats = CREATURE_STATS.ghost;
          summonGhostSpecialBtn.disabled = lord.gold < ghostStats.cost || currentTroopSlots + ghostStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 1;
          summonGhostSpecialBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 1);
          
          // Гроб (нужен уровень 2+)
          const coffinStats = CREATURE_STATS.coffin;
          summonCoffinSpecialBtn.disabled = lord.gold < coffinStats.cost || currentTroopSlots + coffinStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 2;
          summonCoffinSpecialBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 2);
  
          // Вампир (нужен уровень 2+)
          const vampireStats = CREATURE_STATS.vampire;
          summonVampireSpecialBtn.disabled = lord.gold < vampireStats.cost || currentTroopSlots + vampireStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 2;
          summonVampireSpecialBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 2);
  
          // Огромная Летучая Мышь (нужен уровень 3+)
          const hugeBatStats = CREATURE_STATS.hugeBat;
          summonHugeBatBtn.disabled = lord.gold < hugeBatStats.cost || currentTroopSlots + hugeBatStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 3;
          summonHugeBatBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 3);
  
          // Золотой скелетик (нужен уровень 3+)
          const goldenSkeletonStats = CREATURE_STATS.goldenSkeleton;
          summonGoldenSkeletonBtn.disabled = lord.gold < goldenSkeletonStats.cost || currentTroopSlots + goldenSkeletonStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 3;
          summonGoldenSkeletonBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 3);
  
          // Проклятый Гроб (нужен уровень 3+)
          const cursedCoffinStats = CREATURE_STATS.cursedCoffin;
          summonCursedCoffinBtn.disabled = lord.gold < cursedCoffinStats.cost || currentTroopSlots + cursedCoffinStats.slotCost > MAX_TROOPS_SLOTS || needsTombstone || tombstoneLevel < 3;
          summonCursedCoffinBtn.classList.toggle('tombstone-locked', needsTombstone || tombstoneLevel < 3);
  
          // *** ИЗМЕНЕННЫЙ БЛОК: ОБНОВЛЕНИЕ ЦВЕТА ЦЕННИКОВ С УЧЕТОМ ЛИМИТА ВОЙСК ***
          document.querySelectorAll('.unit-button-content').forEach(contentDiv => {
              const costSpan = contentDiv.querySelector('.unit-cost');
              const button = contentDiv.parentElement;
              if (!costSpan || !button) return;
  
              const unitType = button.dataset.type;
              if (!unitType) return;
              
              const stats = CREATURE_STATS[unitType];
              if (!stats) return;
  
              const cost = stats.cost;
              const slotCost = stats.slotCost;
              
              const isUnaffordableGold = lord.gold < cost;
              const isUnaffordableSlots = currentTroopSlots + slotCost > MAX_TROOPS_SLOTS;
  
              if (isUnaffordableGold || isUnaffordableSlots) {
                  costSpan.classList.add('unaffordable');
              } else {
                  costSpan.classList.remove('unaffordable');
              }
          });
  
      } else { // Режим строительства
          const towerStats = CREATURE_STATS.tower;
          const magicTowerStats = CREATURE_STATS.magicTower;
          const tombstoneStats = CREATURE_STATS.tombstone;
          const houseStats = CREATURE_STATS.house;
          const towerCount = towers.filter(t => t.type === 'tower' && t.ownerId === lord.id).length;
          const magicTowerCount = towers.filter(t => t.type === 'magicTower' && t.ownerId === lord.id).length;
          const tombstoneCount = towers.filter(t => t.type === 'tombstone' && t.ownerId === lord.id).length;
          const houseCount = towers.filter(t => t.type === 'house' && t.ownerId === lord.id).length;
          buildTowerBtn.disabled = lord.gold < towerStats.levels[0].cost || towerCount >= towerStats.maxCount;
          buildMagicTowerBtn.disabled = lord.gold < magicTowerStats.levels[0].cost || magicTowerCount >= magicTowerStats.maxCount;
          buildTombstoneBtn.disabled = lord.gold < tombstoneStats.levels[0].cost || tombstoneCount >= tombstoneStats.maxCount;
          buildHouseBtn.disabled = lord.gold < houseStats.levels[0].cost || houseCount >= houseStats.maxCount;
          document.getElementById('towerLimitText').textContent = `${towerCount}/${towerStats.maxCount}`;
          document.getElementById('magicTowerLimitText').textContent = `${magicTowerCount}/${magicTowerStats.maxCount}`;
          document.getElementById('tombstoneLimitText').textContent = `${tombstoneCount}/${tombstoneStats.maxCount}`;
          document.getElementById('houseLimitText').textContent = `${houseCount}/${houseStats.maxCount}`;
      }
      dropGoldBtn.disabled = lord.gold < 5;
      updateLeaderboard();
      
      if (currentTroopSlots !== lastCurrentTroopSlots) {
          currentTroopsEl.textContent = currentTroopSlots;
          const changeClass = currentTroopSlots > lastCurrentTroopSlots ? 'count-increase' : 'count-decrease';
          currentTroopsEl.classList.add(changeClass);
          setTimeout(() => { currentTroopsEl.classList.remove(changeClass); }, 300);
      }
      if (MAX_TROOPS_SLOTS !== lastMaxTroopSlots) {
          maxTroopsEl.textContent = MAX_TROOPS_SLOTS;
          const changeClass = MAX_TROOPS_SLOTS > lastMaxTroopSlots ? 'count-increase' : 'count-decrease';
          maxTroopsEl.classList.add(changeClass);
          setTimeout(() => { maxTroopsEl.classList.remove(changeClass); }, 300);
      }
      lastCurrentTroopSlots = currentTroopSlots;
      lastMaxTroopSlots = MAX_TROOPS_SLOTS;
  
      requestAnimationFrame(gameLoop);
    }
  
    // --- НОВЫЕ ФУНКЦИИ ДЛЯ МИНИКАРТЫ И "ТУМАНА ВОЙНЫ" ---
  
    function getTeamColor(teamId) {
        switch(teamId) {
            case 'player': return 'lime';
            case 'bot1': return 'red';
            case 'bot2': return 'orange';
            case 'bot3': return 'pink';
            case 'bot4': return '#e6e600';
            case 'bot5': return '#00bfff';
            default: return 'gray';
        }
    }
  
     function updateDiscoveredObjects(cameraX, cameraY, scale) {
        const checkRadius = canvas.width / (2 * scale); // Радиус видимости игрока
  
        // Объекты, которые нужно проверить на видимость
        const objectsToCheck = [...towers, ...statues, ...bots];
  
        // Проверяем видимость вокруг игрока
        for (const obj of objectsToCheck) {
            if (obj.team !== 'player' && !discoveredObjects.has(obj.id)) {
                if (distance(lord, obj) < checkRadius) {
                    discoveredObjects.add(obj.id);
                }
            }
        }
  
        // Проверяем видимость вокруг построек игрока
        const playerBuildings = towers.filter(t => t.team === 'player');
        for (const building of playerBuildings) {
            for (const obj of objectsToCheck) {
                if (obj.team !== 'player' && !discoveredObjects.has(obj.id)) {
                    if (distance(building, obj) < (building.attackRadius || 300)) { // Используем радиус атаки или стандартное значение
                        discoveredObjects.add(obj.id);
                    }
                }
            }
        }
  
        // Проверяем видимость вокруг войск игрока
        const playerTroops = troops.filter(t => t.team === 'player');
        for (const troop of playerTroops) {
            for (const obj of objectsToCheck) {
                if (obj.team !== 'player' && !discoveredObjects.has(obj.id)) {
                    if (distance(troop, obj) < 200) { // Небольшой радиус видимости для войск
                        discoveredObjects.add(obj.id);
                    }
                }
            }
        }
    }
  
    function drawMinimap(time) {
        const mapSize = minimapCanvas.width;
        const worldSize = WORLD_RADIUS * 2;
        const mapScale = mapSize / worldSize;
  
        minimapCtx.fillStyle = 'black';
        minimapCtx.fillRect(0, 0, mapSize, mapSize);
  
        const worldToMinimap = (obj) => ({
            x: (obj.x + WORLD_RADIUS) * mapScale,
            y: (obj.y + WORLD_RADIUS) * mapScale,
        });
  
        const objects = [...statues, ...towers, lord, ...bots];
        for (const obj of objects) {
            if (obj.isDead || (obj.hp <= 0 && obj.category !== 'object')) continue;
  
            let isVisible = false;
            // Игрок видит свои объекты, статуи свободы и все, что было обнаружено
            if (obj.team === lord.team || obj.type === 'statueLiberty' || discoveredObjects.has(obj.id)) {
                isVisible = true;
            }
            // Если объект - это лорд (бот), и он не в команде игрока, он должен быть в зоне видимости
            if (obj.category === 'lord' && obj.team !== lord.team) {
                isVisible = discoveredObjects.has(obj.id);
            }
            
            if (!isVisible) continue;
  
            const { x, y } = worldToMinimap(obj);
            let color = 'gray';
            let shape = 'square';
            let size = 2;
            let shouldBlink = false;
            
            if (obj.category === 'lord') {
                shape = 'circle';
                size = 1.5;
                color = getTeamColor(obj.team);
                if (obj.inCombatTimer > 0) shouldBlink = true;
            } else if (obj.category === 'building') {
                shape = 'square';
                size = 2.5;
                color = getTeamColor(obj.team);
                if (obj.damageShakeTimer > 0) shouldBlink = true;
            } else if (obj.category === 'object') { // Статуи
                shape = 'rhombus';
                size = 3.5;
                color = (obj.type === 'statueLiberty') ? 'gold' : 'white';
            }
            
            if (shouldBlink && (Math.floor(time / 250) % 2 === 0)) {
                minimapCtx.fillStyle = 'white'; // Мигаем белым
            } else {
                minimapCtx.fillStyle = color;
            }
            
            minimapCtx.beginPath();
            switch(shape) {
                case 'circle':
                    minimapCtx.arc(x, y, size, 0, Math.PI * 2);
                    break;
                case 'square':
                    minimapCtx.rect(x - size / 2, y - size / 2, size, size);
                    break;
                case 'rhombus':
                    minimapCtx.moveTo(x, y - size / 2);
                    minimapCtx.lineTo(x + size / 2, y);
                    minimapCtx.lineTo(x, y + size / 2);
                    minimapCtx.lineTo(x - size / 2, y);
                    minimapCtx.closePath();
                    break;
            }
            minimapCtx.fill();
        }
    }
  
    minimapToggleBtn.addEventListener('click', () => {
      minimapVisible = !minimapVisible;
      minimapCanvas.style.display = minimapVisible ? 'block' : 'none';
    });
  
    updateGoldDisplay();
    leaderboard.style.display = 'none';
    specialTroopsPanel.hidden = true;
    joystick.style.display = 'none';
    buildButtonsDiv.hidden = true;
    menuOverlay.style.display = 'block';
  
    leaderboardToggleBtn.addEventListener('click', () => {
        leaderboardContainer.classList.toggle('closed');
    });
  
    let isUiSwapped = false;
    function applyUiSwap(swapped) {
      isUiSwapped = swapped;
      // Определяем ключ для перевода
      const key = swapped ? "joystick_pos_right" : "joystick_pos_left";
      // Устанавливаем новый ключ для кнопки
      btnSwapUI.setAttribute('data-translate-key', key);
      // Сразу же обновляем текст на текущем языке
      if(translations[currentLanguage] && translations[currentLanguage][key]) {
          btnSwapUI.textContent = translations[currentLanguage][key];
      }
  
      if (swapped) {
          document.body.classList.add('ui-swapped');
      } else {
          document.body.classList.remove('ui-swapped');
      }
      localStorage.setItem('uiSwapped', swapped);
    }
    const savedUiSwap = localStorage.getItem('uiSwapped') === 'true';
    applyUiSwap(savedUiSwap);
  
    btnSettings.addEventListener('click', () => {
      mainMenuButtons.hidden = true;
      settingsMenu.hidden = false;
    });
    btnBackToMainFromSettings.addEventListener('click', () => {
      mainMenuButtons.hidden = false;
      settingsMenu.hidden = true;
    });
    btnLanguage.addEventListener('click', () => {
      settingsMenu.hidden = true;
      languageMenu.hidden = false;
    });
    btnSwapUI.addEventListener('click', () => {
      applyUiSwap(!isUiSwapped);
    });
    btnBackToLang.addEventListener('click', () => {
      languageMenu.hidden = true;
      settingsMenu.hidden = false;
    });
    document.querySelectorAll('.lang-btn').forEach(button => {
      button.addEventListener('click', () => {
          const lang = button.getAttribute('data-lang');
          setLanguage(lang);
          languageMenu.hidden = true;
          settingsMenu.hidden = false;
      });
    });
  
    // --- ДОБАВЛЕНО: ЛОГИКА ДЛЯ НОВЫХ МЕНЮ ---
  


    // --- ДОБАВЛЕНО: Стили для нового меню скинов ---
        const newSkinMenuStyles = 
            `#skinSelection {
                display: flex;
                overflow-x: auto;
                padding: 20px 10px;
                margin: 10px 0;
                background: rgba(0, 0, 0, 0.25);
                border-radius: 15px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                scrollbar-width: thin;
                scrollbar-color: #6a6a6a rgba(0,0,0,0.25);
            }
            #skinSelection::-webkit-scrollbar {
                height: 10px;
            }
            #skinSelection::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.25);
                border-radius: 5px;
            }
            #skinSelection::-webkit-scrollbar-thumb {
                background-color: #6a6a6a;
                border-radius: 5px;
                border: 2px solid rgba(0,0,0,0.25);
            }
            .skin-option {
                flex: 0 0 110px;
                height: 110px;
                margin: 0 8px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                background-color: rgba(10, 20, 30, 0.5);
                border: 2px solid transparent;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.3s, border-color 0.3s;
            }
            .skin-option:hover {
                transform: translateY(-5px);
            }
            .skin-option.selected {
                border-color: #4dffff;
                transform: translateY(-5px) scale(1.05);
            }
            .skin-option img {
                 width: 80%;
                 height: 80%;
                 object-fit: contain;
                 filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.6));
            }
            .skin-option.locked {
                filter: grayscale(80%) brightness(0.7);
                cursor: not-allowed;
            }
            .skin-option.locked:hover {
                transform: none;
            }
            .skin-option .locked-label {
                position: absolute;
                bottom: 5px;
                left: 0;
                right: 0;
                background: rgba(0,0,0,0.7);
                color: #ff4d4d;
                font-size: 12px;
                padding: 2px 0;
                border-radius: 0 0 10px 10px;
                text-align: center;
            }
            /* --- Эффекты свечения --- */
            .skin-option.lord-glow {
                box-shadow: 0 0 15px 4px rgba(150, 150, 150, 0.5);
            }
            .skin-option.tree-glow {
                box-shadow: 0 0 15px 4px rgba(40, 200, 40, 0.6);
            }
            .skin-option.selected.lord-glow {
                box-shadow: 0 0 25px 8px rgba(200, 200, 200, 0.8);
            }
            .skin-option.selected.tree-glow {
                 box-shadow: 0 0 25px 8px rgba(80, 255, 80, 0.85);
            }`
        ;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = newSkinMenuStyles;
        document.head.appendChild(styleSheet);
    
    
        // --- Меню Имени
        const btnName = document.getElementById('btnName');
        const nameMenu = document.getElementById('nameMenu');
        const nameInput = document.getElementById('nameInput');
        const btnSaveName = document.getElementById('btnSaveName');
  
    btnName.addEventListener('click', () => {
        mainMenuButtons.hidden = true;
        nameMenu.hidden = false;
        nameInput.value = playerName;
        nameInput.focus();
    });
  
    btnSaveName.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        if (newName) {
            playerName = newName;
            lord.name = playerName;
            localStorage.setItem('playerName', playerName);
        }
        nameMenu.hidden = true;
        mainMenuButtons.hidden = false;
    });
  
    // Меню Скинов и Кодов
    const skinsBtn = document.getElementById('skinsBtn');
    const codesBtn = document.getElementById('codesBtn');
    const skinsMenu = document.getElementById('skinsMenu');
    const codesMenu = document.getElementById('codesMenu');
    const skinSelection = document.getElementById('skinSelection');
    const codeInput = document.getElementById('codeInput');
    const submitCodeBtn = document.getElementById('submitCodeBtn');
    const codeStatus = document.getElementById('codeStatus');
  
    function renderSkins() {
        skinSelection.innerHTML = '';
        availableSkins.forEach(skin => {
            const skinDiv = document.createElement('div');
            skinDiv.className = 'skin-option'; // Базовый класс
            skinDiv.dataset.skin = skin;

            // --- ДОБАВЛЕНО: Логика для добавления класса свечения ---
            if (skin === "🌳") {
                skinDiv.classList.add('tree-glow'); // Зеленое свечение для дерева
            } else {
                skinDiv.classList.add('lord-glow'); // Серое свечение для остальных
            }
            // --- КОНЕЦ ДОБАВЛЕНИЯ ---

            // Отображение картинки или эмодзи
            const imageForSkin = lordSkinImages[skin];
            if (imageForSkin) {
                const imgElement = document.createElement('img');
                imgElement.src = imageForSkin.src;
                skinDiv.appendChild(imgElement);
            } else {
                skinDiv.textContent = skin;
            }

            // Проверка, разблокирован ли скин
            const isUnlocked = unlockedSkins.has(skin);
            if (!isUnlocked) {
                skinDiv.classList.add('locked');
                const lockedLabel = document.createElement('span');
                lockedLabel.className = 'locked-label';
                lockedLabel.dataset.translateKey = 'locked_for_code';
                lockedLabel.textContent = translations[currentLanguage].locked_for_code || "      за код";
                skinDiv.appendChild(lockedLabel);
            } else {
                // Добавляем обработчик клика для разблокированных скинов
                skinDiv.addEventListener('click', () => {
                    playerSkin = skin;
                    lord.emoji = playerSkin;
                    lord.image = lordSkinImages[skin] || null; // Обновляем и картинку
                    localStorage.setItem('playerSkin', playerSkin);
                    renderSkins(); // Перерисовываем меню, чтобы показать выбор
                });
            }

            // Если скин выбран, добавляем ему специальный класс
            if (skin === playerSkin) {
                skinDiv.classList.add('selected');
            }

            skinSelection.appendChild(skinDiv);
        });
    }
  
    skinsBtn.addEventListener('click', () => {
        renderSkins();
        skinsMenu.hidden = false;
    });
    
    codesBtn.addEventListener('click', () => {
        codesMenu.hidden = false;
        codeStatus.textContent = '';
        codeInput.value = '';
    });
  
    document.querySelectorAll('.close-menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById(btn.dataset.targetMenu).hidden = true;
        });
    });
    
    submitCodeBtn.addEventListener('click', () => {
        if (codeInput.value.toLowerCase() === "i want to break tree") {
            unlockedSkins.add("🌳");
            localStorage.setItem('unlockedSkins', JSON.stringify([...unlockedSkins]));
            codeStatus.textContent = translations[currentLanguage].code_unlocked || "Скин разблокирован!";
            codeStatus.style.color = 'lime';
        } else {
            codeStatus.textContent = translations[currentLanguage].code_invalid || "Неверный код";
            codeStatus.style.color = 'red';
        }
    });
  
    // --- НОВАЯ ЛОГИКА ДЛЯ ПАНЕЛИ УДАЛЕНИЯ ВОЙСК ---
    const deleteTroopBtn = document.getElementById('deleteTroopBtn');
    const deleteTroopPanel = document.getElementById('deleteTroopPanel');
    const closeDeleteTroopPanelBtn = document.getElementById('closeDeleteTroopPanelBtn');
    const deleteTroopList = document.getElementById('deleteTroopList');
    const deleteTroopTitle = deleteTroopPanel.querySelector('h2');
  
    function populateDeleteTroopList() {
        deleteTroopList.innerHTML = ''; // Очищаем список
        
        const playerTroops = troops.filter(t => t.ownerId === lord.id && CREATURE_STATS[t.type]);
        
        if (playerTroops.length === 0) {
            // ИЗМЕНЕНО: Используем ключ перевода
            const noTroopsMsg = translations[currentLanguage].notification_no_troops_to_delete || "You have no troops to delete.";
            deleteTroopList.innerHTML = `<p style="text-align:center; opacity: 0.7;">${noTroopsMsg}</p>`;
            return;
        }
  
        playerTroops.forEach(troop => {
            const troopItem = document.createElement('div');
            troopItem.className = 'delete-troop-item';
            troopItem.dataset.troopId = troop.id;
            
            const stats = CREATURE_STATS[troop.type];
            const unitNameKey = `unit_name_${troop.type}`;
            const translatedName = translations[currentLanguage][unitNameKey] || troop.type;
            
            troopItem.innerHTML = `<span>${stats.emoji} ${translatedName}</span> <span>${troop.hp}/${troop.maxHp} ❤️</span>`;
            
            troopItem.addEventListener('click', () => {
                const troopId = troopItem.dataset.troopId;
                const troopIndex = troops.findIndex(t => t.id === troopId);
                
                if (troopIndex !== -1) {
                    const troopToDelete = troops[troopIndex];
                    // Уменьшаем счетчик слотов
                    currentTroopSlots -= (troopToDelete.slotCost || 0);
                    // Удаляем войско из массива
                    troops.splice(troopIndex, 1);
                    // Обновляем список в панели
                    populateDeleteTroopList();
                }
            });
            
            deleteTroopList.appendChild(troopItem);
        });
    }
  
    deleteTroopBtn.addEventListener('click', () => {
        // Устанавливаем заголовок в соответствии с языком
        const titleKey = 'delete_troop_title';
        deleteTroopTitle.dataset.translateKey = titleKey;
        deleteTroopTitle.textContent = translations[currentLanguage][titleKey] || 'Delete Troop';
  
        populateDeleteTroopList();
        deleteTroopPanel.style.display = 'flex';
    });
  
    closeDeleteTroopPanelBtn.addEventListener('click', () => {
        deleteTroopPanel.style.display = 'none';
    });
  
    // --- ДОБАВЛЕНО: НОВАЯ ЛОГИКА ДЛЯ ВСПЛЫВАЮЩИХ ПОДСКАЗОК КНОПОК ---
      const buttonTooltipEl = document.getElementById('buttonTooltip');
  
      // Какая кнопка (по ID) какой текст (по ключу перевода) должна показывать
      const buttonTooltipMapping = {
          'attackBtn': 'tooltip_attack_mode',
          'defenseBtn': 'tooltip_defense_mode',
          'holdPositionBtn': 'tooltip_hold_mode',
          'dropGold': 'tooltip_give_gold',
          'spawnToggleBtn': 'tooltip_switch_profession',
          'toggleSpecialPanelsBtn': 'tooltip_bestiary',
          'minimapToggleBtn': 'tooltip_minimap_toggle',
          'leaderboardToggleBtn': 'tooltip_leaderboard_toggle',
          'deleteTroopBtn': 'tooltip_delete_troop',
          'teamSwitchBtn': 'tooltip_team_switch' // Добавлена кнопка 🌝
      };
      
      // Функция для показа подсказки
      function showButtonTooltip(buttonEl, textKey) {
          const text = translations[currentLanguage][textKey] || '';
          if (!text || !buttonEl) return;
  
          buttonTooltipEl.innerHTML = text;
          buttonTooltipEl.classList.add('visible');
          
          setTimeout(() => {
              const btnRect = buttonEl.getBoundingClientRect();
              const tooltipRect = buttonTooltipEl.getBoundingClientRect();
  
              let top = btnRect.top - tooltipRect.height - 10;
              let left = btnRect.left + (btnRect.width / 2) - (tooltipRect.width / 2);
  
              if (top < 5) top = btnRect.bottom + 10;
              if (left < 5) left = 5;
              if (left + tooltipRect.width > window.innerWidth - 5) {
                  left = window.innerWidth - tooltipRect.width - 5;
              }
              
              buttonTooltipEl.style.top = `${top}px`;
              buttonTooltipEl.style.left = `${left}px`;
          }, 0);
      }
      
      // Функция, чтобы спрятать подсказку
      function hideButtonTooltip(timerRef) {
          if(timerRef) clearTimeout(timerRef);
          buttonTooltipEl.classList.remove('visible');
      }
  
      // Функция, которая вешает все нужные события на одну кнопку
      function addTooltipEvents(buttonId, textKey) {
          const buttonEl = document.getElementById(buttonId);
          if (!buttonEl) return;
          
          let tooltipTimer = null;
          let isLongPress = false;
  
          const startPress = (e) => {
              e.preventDefault();
              isLongPress = false;
              
              tooltipTimer = setTimeout(() => {
                  isLongPress = true;
                  showButtonTooltip(buttonEl, textKey);
              }, 1500); // 1.5 секунды на удержание
          };
  
          const endPress = (e) => {
              e.preventDefault();
              clearTimeout(tooltipTimer);
              
              if (!isLongPress) {
                  // Если удержание не сработало, значит это обычный клик
                  buttonEl.click();
              }
              
              // В любом случае прячем подсказку при отпускании
              hideButtonTooltip();
          };
  
          // Навешиваем события на мышь
          buttonEl.addEventListener('mousedown', startPress);
          buttonEl.addEventListener('mouseup', endPress);
          buttonEl.addEventListener('mouseleave', () => hideButtonTooltip(tooltipTimer));
  
          // Навешиваем события на сенсорные экраны
          buttonEl.addEventListener('touchstart', startPress, { passive: false });
          buttonEl.addEventListener('touchend', endPress);
          buttonEl.addEventListener('touchcancel', () => hideButtonTooltip(tooltipTimer));
      }
      
      // Проходим по всем нашим кнопкам и "оживляем" их
      for (const [buttonId, textKey] of Object.entries(buttonTooltipMapping)) {
          addTooltipEvents(buttonId, textKey);
      }
      // --- КОНЕЦ БЛОКА ЛОГИКИ ПОДСКАЗОК ---
  
    requestAnimationFrame(gameLoop);
  })();
  