export interface INavbarLinks{
    title:String
    dropdown ?: INavbarLinks[]
}
export const NavbarLinks : INavbarLinks[] = [
    {
        title:"Teachers"
    },
    {
        title:"School"
    },
    {
        title:"Resources",
        dropdown:[
            {
                title:"Training"
            },
            {
                title:"Teacher Resources"
            },
            {
                title:"Big Ideas"
            },
            {
                title:"Activity Corner"
            },
        ]
    },
    {
        title:"Dojo Island"
    },
    {
        title:"The People"
    }
]