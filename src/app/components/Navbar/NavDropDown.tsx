import { Button } from "@/components/ui/button";
import { INavbarLinks } from "@/data";
import Link from "next/link";

const NavDropDown = ({ list }: { list: INavbarLinks[] }) => {
    return (
      <ul className="relative pl-5 md:p-2 hidden group-focus-within:flex md:group-hover:flex md:absolute top-full left-0 bg-white md:border flex-col gap-1 rounded-sm">
        {list.map(({ title }, ind) => (
          <li className=" w-full" key={ind}>
            <Button
              variant={"link"}
              className="w-full justify-stretch "
              asChild
            >
              <Link href={"/"}>{title}</Link>
            </Button>
          </li>
        ))}
      </ul>
    );

};
export default NavDropDown