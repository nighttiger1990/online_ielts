import { FC } from "react"
import LessonBox, { ILesson } from "./lesson-box"
import { nanoid } from "nanoid"

export interface IUnit {
	key?: string,
	name?: string,
	data: ILesson[]
}

export interface IUnitProps {
	props: IUnit
}

const UnitBox: FC<IUnitProps> = ({ props }): JSX.Element => {
	return <section className="text-white">
		<h3 className="font-semibold mb-5">{props?.name}</h3>
		{props?.data.map((lesson, index) =>
			<LessonBox key={nanoid()} lesson={lesson} />
		)}
	</section>
}

export default UnitBox