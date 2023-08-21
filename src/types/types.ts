export interface ICourseCat {
	active: boolean,
	description: string,
	id: number,
	level: number,
	name: string,
	parent: number,
	slug: string,
}
export interface IContext {
	user: IUser,
	categories: ICourseCat[],
	courses: ICourse[],
	units: IUnit[],
	lessons: ILesson[],
	quizs: IQuiz[]
}

export interface IUser {
	id: number,
	displayName: string,
	email: string,
	avatar: string
}

export interface ILesson {
	active: boolean
	chapterId: number
	checkpoint:boolean
	courseId: number
	description: string
	displayOrder: number
	id: number
	name: string
	requirePoint: number
	slug: string
	timeLength: number
	type: string
	videoUrl: string
}

export interface IQuiz {
	id: string,
    title: string
    description: string
    content: string,
	type: string,
	lessonId: number,
	active: boolean
	time: number
	chapterId: number
}

export interface IAnswer {
	id: string
	content: string
	right: boolean
}

export interface IQuestion {
	id: string
	title: string
	content: string
	type: string
	answers: IAnswer[]
}

export interface IUnit {
	active: boolean,
	id: number,
	courseId: number,
	lessonsCount: number,
	name: string,
}

export interface ICourse {
	id: number,
	categoryId: number,
	name: string,
	slug: string,
	introVideo: string,
	description: string,
	isComplete: boolean
}


export interface IUserAnswer {
	id: string,
	answer: string,
	correct: boolean
}

export interface IDefinition {
	id: string,
	vocabularyId: string,
	definition: string,
	typeOfSpeech: string,
	exampleSentence: string
}

export interface IWord {
	id: string,
	lessonId: number,
	word: string,
	phonemes: string,
	vocabularyDefinitions: IDefinition[]
}

export interface ILessonProgress {
	userId: number,
	lessonId: number,
	progress: number,
	completed: boolean
}

export interface IQuizProgress {
	id: string,
	quizId: string,
	lessonId: number,
	content: string
}