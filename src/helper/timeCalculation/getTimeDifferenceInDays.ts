export const getTimeDifferenceInDays = (start, end) => {
	let difference = end - start;

	//from seconds to floored days
	difference = Math.floor(difference / 60 / 60 / 24);

	return difference;
}

