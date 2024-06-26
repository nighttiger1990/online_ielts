"use client"

import { useAllLessonsProgressQuery, useAllLessonsQuery, useAllUnitsQuery, useCategoriesQuery, useCoursesQuery, useUserInfoQuery } from "@/base/query";
import SideNav from "@/components/navigation/sidenav";
import TopNav from "@/components/navigation/topnav";
import { GlobalContext } from "@/context/context";
import { IGlobalContext } from "@/types/types";
import { observer, useObservable } from "@legendapp/state/react";
import Image from "next/image";
import dashboardbg from "public/images/dashboard-bg.svg";
import { PropsWithChildren, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { BrowserView } from 'react-device-detect';
import GTM from "./gtm";

const Layout = observer(({ children }: PropsWithChildren) => {
	const [cookies] = useCookies(['.AspNetCore.SharedCookie']);
	const { isFetched: isFinishFetchCategories, data: allCategories } = useCategoriesQuery(cookies)
	const { isFetched: isFinishFetchCourses, data: allCourses } = useCoursesQuery(cookies)
	const allLessons = useAllLessonsQuery(allCourses, cookies)
	const lessonsProgress = useAllLessonsProgressQuery(allCourses, cookies)
	const allUnits = useAllUnitsQuery(allCourses, cookies)
	const {data: userInfo} = useUserInfoQuery(cookies)

	const state = useObservable<IGlobalContext>({
		userInfo: undefined,
		cookies: cookies,
		isSessonValid: true,
		isNavOpen: true,
		categories: [],
		courses: [],
		units: [],
		lessons: [],
		quizs: [],
		lessonProgress: [],
		isLostPasswordPage: false,
		isQrScanning: false,
	})

	useEffect(() => {
		if (isFinishFetchCategories && typeof window !== undefined && !allCategories) {
			// window.location.assign('https://ant-edu.ai/auth/login')
			console.log('not login')
			state.isSessonValid.set(false)
		}

		if (isFinishFetchCourses && typeof window !== undefined && !allCourses) {
			// window.location.assign('https://ant-edu.ai/auth/login')
			console.log('not login')
			state.isSessonValid.set(false)
		}
	}, [allCategories, allCourses, isFinishFetchCategories, isFinishFetchCourses, state.isSessonValid])

	state.categories.set(allCategories)
	state.courses.set(allCourses)
	const allLessonsData = allLessons.map(array => array.data)
	state.lessons.set(Object.values(allLessonsData).flat())
	const allLessonsProgressData = lessonsProgress.map(array => array.data)
	state.lessonProgress.set(Object.values(allLessonsProgressData).flat())
	const allUnitsData = allUnits.map(array => array.data)
	state.units.set(Object.values(allUnitsData).flat())
	state.userInfo?.set(userInfo)

	return (
		<GlobalContext.Provider value={state}>
			<div className="dashboard-wrapper flex bg-sea-light ">
				<GTM />
				<BrowserView>
					<SideNav />
				</BrowserView>
				<main className="bg-sea w-full min-h-screen relative" style={{gridArea: "dashboard"}}>
					<Image src={dashboardbg} alt="background" loading="lazy" className="absolute top-0 left-0 z-0 max-h-full" />
					<BrowserView>
						<TopNav />
					</BrowserView>
					<div className="relative z-[1]">{children}</div>
				</main>
			</div>
		</GlobalContext.Provider>
	)
})

export default Layout