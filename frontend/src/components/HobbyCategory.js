import React from 'react'
import hobbyList from "constants/hobbyList";

function HobbyCategory(props) {

	const { setCategory } = props;

	return (
		<select name="pets" id="pet-select" onChange={(e) => setCategory(e.currentTarget.value)}>
			<option value="">취미를 고르세요</option>
			{hobbyList.map((elem) => <option key={elem} value={elem}>{elem}</option>)}
		</select>
	)
}

export default HobbyCategory;