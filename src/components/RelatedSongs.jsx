import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
	console.log(data ? data : 'error');
	return (
		<div className='flex flex-col'>
			<h1 className='font-bold text-3xl text-white'> Related Songs</h1>
			{!data?.tracks ? (
				<p className='mt-2 text-gray-100 font-medium'>Sorry, No Related songs found.</p>
			) : (
				<div className='mt-6 w-full flex flex-col'>
					{data?.tracks?.map((song, i) => (
						<SongBar
							key={`${song.key}-${artistId}`}
							song={song}
							i={i}
							artistId={artistId}
							activeSong={activeSong}
							handlePause={handlePauseClick}
							handlePlay={() => handlePlayClick(song, i)}
							isPlaying={isPlaying}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default RelatedSongs;
