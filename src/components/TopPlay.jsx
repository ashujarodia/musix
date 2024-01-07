import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
	<div className='w-full flex flex-row text-sm items-center hover:bg-[#6e424d] py-2 p-2 rounded-lg cursor-pointer mb-2'>
		<h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>
		<div className='flex-1 flex flex-row justify-between items-center'>
			<img
				className='w-10 h-10 rounded-lg'
				src={song?.images?.coverart}
				alt={song?.title}
			/>
			<div className='flex-1 flex flex-col justify-center mx-3'>
				<Link to={`/songs/${song.key}`}>
					<p className=' font-bold text-white'>{song?.title}</p>
				</Link>
				<Link to={`/artists/${song?.artists[0].adamid}`}>
					<p className='text-base text-gray-300 mt-1'>{song?.subtitle?.length > 25 ? song?.subtitle.slice(0, 25) : song?.subtitle}</p>
				</Link>
			</div>
		</div>
		<PlayPause
			isPlaying={isPlaying}
			activeSong={activeSong}
			song={song}
			handlePause={handlePauseClick}
			handlePlay={handlePlayClick}
		/>
	</div>
);

const TopPlay = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data } = useGetTopChartsQuery();
	const tracks1 = data?.tracks;
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth' });
	});

	const topPlays = tracks1?.slice(0, 5);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	return (
		<div
			ref={divRef}
			className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'
		>
			<div className='w-full flex flex-col'>
				<div className='flex flex-row justify-between items-center'>
					<h2 className='text-white font-bold'>Top Charts</h2>
					<Link to='/top-charts'>
						<p className='text-gray-300 text-base cursor-pointer'> See more</p>
					</Link>
				</div>
				<div className='mt-4 flex flex-col gap-1'>
					{topPlays?.map((song, i) => (
						<TopChartCard
							key={song.key}
							song={song}
							i={i}
							isPlaying={isPlaying}
							activeSong={activeSong}
							handlePauseClick={handlePauseClick}
							handlePlayClick={() => handlePlayClick(song, i)}
						/>
					))}
				</div>
			</div>

			<div className='w-full flex flex-col my-8'>
				<div className='flex flex-row justify-between items-center'>
					<h2 className='text-white font-bold'>Top Artists</h2>
					<Link to='/top-artists'>
						<p className='text-gray-300 text-base cursor-pointer'> See more</p>
					</Link>
				</div>
				<Swiper
					slidesPerView='auto'
					spaceBetween={15}
					freeMode
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className='mt-4'
				>
					{topPlays?.map((song, i) => (
						<SwiperSlide
							key={song.key}
							style={{ width: '17%', height: 'auto' }}
							className='shadow-lg animate-slideright'
						>
							<Link
								to={`artists/${song?.artists?.[0]?.adamid}`}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
								}}
							>
								<img
									src={song?.images.background}
									alt='name'
									className='rounded-full w-full object-cover'
								/>
								<p
									className='text-white text-sm font-medium capitalize'
									style={{ fontSize: 'clamp(12px, 3vw, 16px)' }}
								>
									{song?.artists?.[0]?.alias}
								</p>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default TopPlay;
