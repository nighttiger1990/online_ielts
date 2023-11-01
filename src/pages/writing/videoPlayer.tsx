import { fetchData, postData } from "@/base/base";
import { useSubtitleQuery, useValidToken } from "@/base/query";
import { GlobalContext, SubtitleContext } from "@/context/context";
import { ISubtitle, IVideoProgessData } from "@/types/types";
import { observer, useObservable } from "@legendapp/state/react";

import { useContext } from "react";
import ReactPlayer from "react-player/lazy";

interface IPlayer {
	playerRef: any,
	video: string,
	isPlaying: boolean,
	lessonId: number
}

const VideoPlayer = observer(({ playerRef, video, isPlaying, lessonId }: IPlayer) => {
	const subtitleContext = useContext(SubtitleContext)
	const token = useValidToken().data as string
	const subtitles = useSubtitleQuery(+lessonId, token).data as ISubtitle[]

	const handleLessonStart = () => {
		postData("user/course", token, {"lessonId": lessonId, "progress": 0}).then(res => console.log(res))
	}
	const handleLessonFinish = () => {
		postData("user/course", token, {"lessonId": lessonId, "progress": 100}).then(res => console.log(res))
	}

	const handleShowSubtitles = (data: IVideoProgessData) => {
		if (!subtitles) {
			return
		}

		subtitles.map(s => {
			if (+data.playedSeconds.toFixed(0) >= s.startAt &&
				+data.playedSeconds.toFixed(0) <= s.endAt
			) {
				subtitleContext.set(s.content)
				return
			}

			subtitleContext.set("")
		})
		console.log(data.playedSeconds.toFixed(0))
	}

	const tempVideo = "//s3.envoy.rocks/bothrs/goud-design-sprint/goud/LhgEcS_GOUD+PROTOTYPE+SHOWCASE.mp4"
	return (
		<div className="relative pt-[56.25%]">
			<ReactPlayer
				ref={playerRef}
				url={video || tempVideo}
				className="react-player absolute top-0 left-0"
				controls
				width="100%"
				height="100%"
				playing={isPlaying}
				onProgress={data => handleShowSubtitles(data)}
				onStart={() => handleLessonStart()}
				onEnded={() => handleLessonFinish()}
			/>
		</div>
	);
})

export default VideoPlayer