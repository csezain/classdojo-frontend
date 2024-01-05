import { StaticImageData } from "next/image";
import Teacher from "@/app/images/AccountsBarIcons/teacher_badge.webp";
import Father from "@/app/images/AccountsBarIcons/parent_badge.webp";
import Student from "@/app/images/AccountsBarIcons/student_badge.webp";

export interface AccountBar {
  icon: StaticImageData;
  title: string;
}

export const accountsBarData: AccountBar[] = [
  {
    icon: Teacher,
    title: "Teacher",
  },
  {
    icon: Father,
    title: "Father",
  },
  {
    icon: Student,
    title: "Student",
  },
];
