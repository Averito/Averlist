import { GetStaticProps } from 'next';

import { AnimeCatalog } from '@pages/AnimeCatalog';
import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria';
import dayjs from 'dayjs';

export default AnimeCatalog;

export const getStaticProps: GetStaticProps = async () => {
	const years = await anilibria.getYears();
	const genres = await anilibria.getGenres();

	const queryObject = {
		...queryObjectByDefault,
		limit: 44,
		since: new Date(`01-01-${dayjs().year()}`).getDate(),
	};
	const updatesTitleList = await anilibria.getUpdates(queryObject);

	return {
		props: {
			years,
			genres,
			titleList: updatesTitleList,
		},
		revalidate: 60,
	};
};
