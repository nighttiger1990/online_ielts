import { useCategoriesQuery, useCoinQuery, useCoursesQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICategory, ICourse, IUnit } from "@/types/types"
import { nanoid } from "nanoid"
import Image from "next/image"
import Link from "next/link"
import coin from "public/images/coin.svg"
import hand from "public/images/hand.svg"
import silver from "public/images/silver.svg"
import banner from "public/images/user-banner.png"
import { useContext, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import CourseDropdown from "./dropdown"
import courseIcon from "public/images/course.svg"
import examIcon from "public/images/exam.svg"

const colors = [
	{
		text: '#F09000',
		bgc: '#FCE1A8'
	},{
		text: '#F09000',
		bgc: '#FCE1A8'
	},{
		text: '#007DF0',
		bgc: '#53CBED'
	},{
		text: '#007DF0',
		bgc: '#53CBED'
	},{
		text: '#FF228B',
		bgc: '#FF87C0'
	},{
		text: '#FF228B',
		bgc: '#FF87C0'
	},{
		text: '#608200',
		bgc: '#AFCD58'
	},{
		text: '#608200',
		bgc: '#AFCD58'
	},{
		text: '#7B00DB',
		bgc: '#CB87FF'
	},{
		text: '#7B00DB',
		bgc: '#CB87FF'
	}
]

const Route = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCoin, data: myCoin } = useCoinQuery(context.cookies.get())
	
	const [availableCategories, setAvailableCategories] = useState<ICategory[]>([])
	const [choice, setChoice] = useState(0)
	const [allCourses, setAllCourses] = useState<ICourse[]>([])

	useEffect(() => {
		if (isFinishFetchCourses && isFinishFetchCategories && typeof window !== undefined) {
			setAvailableCategories(categories.filter((cat : ICategory) => courses?.some((course: ICourse) => course.categoryId === cat.id)))
			setAllCourses(courses)
		}

	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses])

	return <div>
		<div className="relative">
			<Image src={banner} width={1039} height={137} alt="route banner" />
			{isFinishFetchUserInfo && userInfo &&
				<div className="absolute left-[56px] top-1/2 -translate-y-1/2">
					<div className="flex items-center gap-4 font-semibold text-[22px]">
						<ReactSVG src={hand["src"]} />
						Hi {userInfo.displayName}, Happy learning
					</div>

					{isFinishFetchCoin && myCoin &&
						<div className="flex gap-[42px] items-center mt-[16px]">
							<span className="py-[6px] px-[12px] bg-[#FFBD00] text-sea font-semibold rounded-full">Premium User</span>

							<div className="inline-flex items-center gap-[12px]">
								<ReactSVG src={coin["src"]} />
								<span>{myCoin.pCoin}</span>
							</div>

							<div className="inline-flex items-center gap-[12px]">
								<ReactSVG src={silver["src"]} />
								<span>{myCoin.fCoin}</span>
							</div>
						</div>
					}
				</div>
			}
		</div>

		<div className="flex mt-[40px]">
			<span className="text-[#F4754C] lg:text-[#93D3E6] bg-[#F4754C] lg:bg-[#93D3E6]"></span>
			<div className="flex flex-col gap-[30px] w-1/2">
				<CourseDropdown iconSrc={courseIcon["src"]} activeColor="#F4754C" number={availableCategories.length} text1="Khóa học của tôi" text2="khóa học" handleClick={() => setChoice(1)} handleItemClick={() => setChoice(1)} />
				<CourseDropdown iconSrc={examIcon["src"]} activeColor="#93D3E6" number={5} text1="IELTS Speaking Test" text2="lượt" handleClick={() => setChoice(2)} />
			</div>

			{choice === 1 && allCourses &&
				<div className="w-1/2 grid grid-cols-2 gap-[33px] pl-[60px]">
					{allCourses.sort((a, b) => a.categoryId - b.categoryId)
						.map((c: ICourse, index) => (
							<Link href={'/categories/' + c.categoryId} key={nanoid()} className="block rounded-[16px] overflow-hidden">
								<div className="flex flex-col items-center py-[23px]" style={{backgroundColor: colors[index]?.bgc}}>
									<span className="font-bold opacity-20 text-[50px]" style={{color: colors[index]?.text}}>0{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":")[0].slice(-1)}</span>
									<span className="font-bold text-[24px] mt-[-20px]" style={{color: colors[index]?.text}}>{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":").pop()}</span>
								</div>
								<div className="flex flex-col gap-[6px] pt-[8px] pb-[13px] px-[25px] bg-white bg-opacity-20">
									<span className="capitalize font-semibold text-[14px]">{c.name}</span>
									<span>{context.units.get().filter((u: IUnit) => u?.courseId === c.id).length} bài học</span>
								</div>
							</Link>
						)
					)}
				</div>
			}
		</div>
	</div>
}

export default Route