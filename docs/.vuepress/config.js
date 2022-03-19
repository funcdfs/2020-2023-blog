module.exports = {
    head: [
        // [
        //     "link",
        //     {
        //         rel: "stylesheet",
        //         href:
        //             "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
        //     },
        // ], //katex
        // [
        //     "script",
        //     {
        //         language: "javascript",
        //         type: "text/javascript",
        //         src:
        //             "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js",
        //     },
        // ],
    ],
    title: "konng",
    logo: "/public/logo.ico", //好不容易扣出来的四叶草

    markdown: {
        //markdown扩展
        lineNumbers: false, // 代码行号应该关闭，要不然手机查看很费劲 ,,但是从来不再手机上面看hhh
        extendMarkdown: (md) => {
            md.set({
                html: true,
            });
            md.set({
                breaks: true, //去除markdown中的两空格换行
            });
            md.use(require("markdown-it-deflist")); // ~汉字列表
            md.use(require("markdown-it-task-lists")); //todo渲染
            md.use(require("markdown-it-mark")); //高亮
            md.use(require("markdown-it-imsize")); //自定义图片的大小
            md.use(require("markdown-it-vuepress-code-snippet-enhanced")); //代码块文件引入
        },
    },
    plugins: [
        // ['meting', {
        //   meting: {
        //     server: 'netease',
        //     type: 'playlist',
        //     mid: '5394472457',
        //   },
        //   aplayer: {
        //     lrcType: 3,
        //   },
        // }, ],
        ["@maginapp/vuepress-plugin-katex"],
        ["demo-code"],
        ["pangu"],
        ["go-top"],
        ["reading-progress"],
        ["flowchart"],
        [
            "zooming",
            {
                selector: ".content :not(a) > img",
            },
        ],
        ["img-lazy"],
        ["code-switcher"], //多语言选项卡,学习后自定义一个简化后使用
        [
            "cursor-effects",
            {
                shape: ["circle"], // shape of the particle, default: 'star'
            },
        ], //鼠标特效
        [
            "@vuepress/pwa",
            {
                //pwa
                serviceWorker: true,
                updatePopup: {
                    message: "New Content Update!",
                    buttonText: "Refresh Page",
                },
            },
        ],
        //容器添加
        [
            "vuepress-plugin-container",
            {
                type: "note",
                before: (info) =>
                    `<div class="note"><p class="title">${info}</p>`,
                after: "</div>",
            },
        ],
        [
            "vuepress-plugin-container",
            {
                //添加 details 容器
                type: "showmore",
                before: (info) =>
                    `<details class="showmore">${
                        info ? `<summary>${info}</summary>` : ""
                    }\n`,
                after: () => "</details>\n",
            },
        ],
        [
            "vuepress-plugin-container",
            {
                //添加居中容器
                type: "center",
                before: (info) => `<div class="customer-container-center">`,
                after: "</div>",
            },
        ],
        [
            "vuepress-plugin-container",
            {
                //添加居右容器
                type: "right",
                defaultTitle: "",
            },
        ],
    ],

    theme: "meteorlxy",
    themeConfig: {
        //主题配置项
        markdown: {
            enableAll: true,
        },
        locales: {
            "/": {
                lang: "en-US",
            },
        }, //US
        lastUpdated: true, //最后更新时间
        lang: Object.assign(
            require("vuepress-theme-meteorlxy/lib/langs/en-US"),
            {
                home: ` konng.vercel.app`,
            }
        ), //自定义部分文字
        pagination: {
            perPage: 10,
        }, //每页文章数量smoothScroll: true,
        nav: [
            {
                text: "Home",
                link: "/",
                exact: true,
            },
            {
                text: "Posts",
                link: "/posts/",
                exact: false,
            },
            {
                text: "notef",
                link: "https://notef.vercel.app/",
                exact: false,
            },
            {
                text: "wikif",
                link: "https://wikif.vercel.app/",
                exact: false,
            },
        ], //navbar导航栏
        personalInfo: {
            nickname: "konng",
            description: "Waiting is a lost art.",
            // description: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=80% height=52 src="//music.163.com/outchain/player?type=2&id=1297742167&auto=0&height=32"></iframe>',
            email: "konng0120@gmail.com",
            location: "Tai'Yuan, Shan'Xi, China",
            organization: "Shan'Xi University",
            // avatar: "https://s2.loli.net/2021/12/09/SG5unjPJftqULgI.jpg",
            // avatar: "https://s2.loli.net/2022/01/26/egdCNVunqMRoiUY.png",
            avatar: "https://s2.loli.net/2022/02/16/jKLc5BhgYMfZkPq.png",
            sns: {
                github: {
                    account: "fengwei2002",
                    link: "https://github.com/fengwei2002",
                },
                zhihu: {
                    account: "kycu",
                    link:
                        "https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba",
                },
            },
        }, //个人信息
        header: {
            background: {
                useGeo: false,
                url: "https://s2.loli.net/2022/02/16/pa8cMOXlbjYABTI.png",
                // url:
                //     "https://cdn.acwing.com/media/article/image/2021/07/10/101476_991fc8bee1-head002.jpg",
            },
            showTitle: true,
        }, //header设置
        footer: {
            poweredBy: false,
            poweredByTheme: false,
        }, //fotter
        infoCard: {
            headerBackground: {
                // url: "https://s2.loli.net/2022/02/16/asudXzCNnkgRHep.jpg",
                url:
                    "https://cdn.acwing.com/media/article/image/2021/07/10/101476_991fc8bee1-head002.jpg",
                useGeo: false,
            },
        },
        comments: false,
        // comments: {
        //     platform: "github",
        //     owner: "fengwei2002",
        //     repo: "mygitalk",
        //     clientId: "215827c9064649c94cc7",
        //     clientSecret: "5df7e60cb5e98f7bd04c4cec2786e3f7cc65ca75",
        //     prefix: "[Comments] ",
        //     labels: ["comments"],
        // }, //vssue配置
        // Service Worker 的配置
        serviceWorker: {
            updatePopup: true,
        },
        sidebar: "auto",
    },
};
