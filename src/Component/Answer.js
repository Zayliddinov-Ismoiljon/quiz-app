import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';

export default function Answer({ data, checker, setChecker, idx, isSubmit }) {
	const [isActive, setIsActive] = useState();

	const objToArray = (obj) => {
		let newArray = [];

		for (let i = 0; i <= obj?.incorrect_answers?.length; i++) {
			if (i < obj?.incorrect_answers?.length) {
				newArray.push({ answer: obj?.incorrect_answers[i], isCorrect: 0 });
			} else {
				newArray.push({ answer: obj?.correct_answer, isCorrect: 1 });
			}
		}

		return newArray;
	};

	function randomArray(array) {
		var currentIndex = array.length,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}

	const getArrayChecker = (i, isCorrect) => {
		let newArr = checker;

		checker?.map((e,index) => {
			if(idx === index){
				newArr[idx] = {clickInx: i, isTrue: isCorrect};
			}
		});

		setChecker(newArr);
	}

	const getCheckSelect = () => {
		let a = checker.filter((e,i) => i === idx)[0].isTrue
		if(isSubmit){
			return a === 0 ? "#ffa39e" : a === 1 ? "#b7eb8f" : "#fffb8f"
		} else{
			return a === 0 || a === 1 ? "#e6f7ff" : ""
		}
	}
	
	const answer = objToArray(data);
	return (
		<>
			{answer.map((e, i) => (
				<Card.Grid
					key={i}
					block
					hoverable={false}
					// type={isActive === i ? 'primary' : 'default'}
					size='large'
					className={`shadow-hover rounded my-2 py-3 w-100 cursor-pointer `}
					style={{
						// backgroundColor: `${e.isCorrect == 1 ? '#8bbb11' : '#e84749'}`,
						backgroundColor: `${checker[idx]?.clickInx === i && getCheckSelect()}`,
					}}
					onClick={() => {
						setIsActive(i);
						getArrayChecker(i,e?.isCorrect)
					}}>
					{e?.answer}
				</Card.Grid>
			))}
		</>
	);
}
