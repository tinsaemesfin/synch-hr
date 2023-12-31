"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  BarChart2Icon,
  CalendarIcon,
  DollarSignIcon,
  FolderIcon,
  HandIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  PaperclipIcon,
  Settings2Icon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const TenantSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();
  const navigation = [
    { id: 1, name: "Dashboard", href: "/", icon: HomeIcon },
    { id: 2, name: "Employees", href: "/employee", icon: UsersIcon },
    { id: 3, name: "Contracts", href: "#", icon: FolderIcon },
    {
      id: 4,
      name: "Payroll",
      children: [
        { name: "Overview", href: "#" },
        {
          name: "WorkingHour Per Attendance",
          href: "/payroll/workingHourAndAttendance",
        },
        {
          name: "Attendace With Penality",
          href: "/payroll/attendaceWithPenality",
        },
        { name: "Settings", href: "#" },
      ],
      icon: DollarSignIcon,
      href: "#",
    },
    {
      id: 5,
      name: "Allowance and Incentives",
      href: "/",
      icon: InboxIcon,
    },
    { id: 6, name: "Reports", href: "/reports", icon: BarChart2Icon },
    { id: 7, name: "Attendance", href: "/attendance", icon: CalendarIcon },
    {
      id: 8,
      name: "Company Settings",
      href: "#",
      icon: Settings2Icon,
    },
    { id: 9, name: "Leave", href: "/leave", icon: PaperclipIcon },
    { id: 10, name: "Permission", href: "#", icon: HandIcon },
  ];

  const pathname = usePathname();
  const onClick = (href:string) => {
    router.push(href);
  };

  return (
    <>
      {/* Mobile Menu list */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                    width={200}
                    height={200}
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                        item.href === pathname
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon
                        key={item.name}
                        className={cn(
                          "mr-4 flex-shrink-0 h-6 w-6",
                          item.href === pathname
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        Toooooooooooom Cook
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Desktop Menu */}

      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Image
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
              alt="Workflow"
              width={200}
              height={200}
            />
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {navigation.map((item, index) =>
              item.children ? (
                <Disclosure
                  key={index + "Disclosure"}
                  as="div"
                  className="space-y-1"
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={cn(
                          "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                          item.href === pathname
                            ? "bg-gray-100 text-gray-900"
                            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                        key={item.href + "button"}
                      >
                        <item.icon
                          className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="flex-1">{item.name}</span>
                        <svg
                          className={cn(
                            "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150",
                            open ? "text-gray-400 rotate-90" : "text-gray-300"
                          )}
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                        </svg>
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className="space-y-1"
                        key={"panel" + index}
                      >
                        {item.children.map((subItem, index2) => (
                         
                            <Disclosure.Button
                            onClick={()=>onClick(subItem.href)}
                              key={subItem.name}
                              as="p"
                              className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                            >
                              {subItem.name}
                            </Disclosure.Button>
                         
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ) : (
                <Button
                  key={index + "link"}
                  onClick={()=>onClick(item.href)}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    item.href === pathname
                      ?  "text-gray-600 hover:bg-gray-50 hover:text-gray-900 bg-gray-200"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-200"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-6 w-6",
                      item.href === pathname
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Button>
              )
            )}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {data?.user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Mobile Menu  Opener */}
      <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default TenantSidebar;
