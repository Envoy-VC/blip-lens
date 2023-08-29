import React from 'react';
import {
	useExplorePublications,
	PublicationTypes,
	PublicationMainFocus,
	Post,
} from '@lens-protocol/react-web';
import { Button, Spin } from 'antd';

// Components
import { RecommendedVideoCard } from '@/components/video-page';
import RecommendedVideoCardSkeleton from '@/components/video-page/recommended-video-card/skeleton';

// Icons
import { LoadingOutlined } from '@ant-design/icons';

const RecommendedVideos = () => {
	const {
		data: publications,
		loading,
		next,
	} = useExplorePublications({
		limit: 10,
		publicationTypes: [PublicationTypes.Post],
		metadataFilter: {
			restrictPublicationMainFocusTo: [PublicationMainFocus.Video],
		},
	});
	const [isNextLoading, setIsNextLoading] = React.useState<boolean>(false);

	const handleShowMore = async () => {
		try {
			setIsNextLoading(true);
			await next();
		} catch (error) {
			console.log(error);
		} finally {
			setIsNextLoading(false);
		}
	};

	if (loading)
		return (
			<div className='flex flex-col items-center gap-2'>
				{Array(10)
					.fill(1)
					.map((_, i) => (
						<RecommendedVideoCardSkeleton key={i} />
					))}
			</div>
		);

	if (publications)
		return (
			<div className='flex flex-col items-center gap-2'>
				<div className='flex flex-col gap-2 w-full px-2 lg:px-0'>
					{(publications as Post[]).map((video) => (
						<RecommendedVideoCard key={video.id} video={video} />
					))}
				</div>
				<Button
					type='text'
					size='large'
					className='text-[1rem] font-medium bg-primary hover:!bg-[#2f55ebd0] text-white hover:!text-white my-4'
					onClick={handleShowMore}
				>
					{isNextLoading ? (
						<Spin
							indicator={
								<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />
							}
						/>
					) : (
						'Show More'
					)}
				</Button>
			</div>
		);
};

export default RecommendedVideos;