import React, { FC, useState, useEffect } from 'react';
import { Button, Spin, Card } from 'antd';
import Answer from './Answer';

const TestContainer = ({ categoryId }) => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [checkStore, setCheckStore] = useState([]);
	const [isSubmit, setIsSubmit] = useState(false)

	useEffect(() => {
		setLoading(true);
		const options = {
			method: 'GET',
		};

		fetch(
			`https://opentdb.com/api.php?amount=10&category=${categoryId}`,
			options,
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data.results);
				checkArray(data.results);
				setLoading(false);
			});
	}, []);

	const checkArray = (array) => {
		let arr = []
		array?.forEach((e,i) => {
			arr.push({isTrue: null, clickInx: null})
		})
		setCheckStore([...arr]);
	}

	const handleSubmit = () => {

	}

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

	const getCheckSelect = (idx) => {
		let a = checkStore.filter((e,i) => i === idx)[0].isTrue
		if(isSubmit){
			return a === 0 ? "#ffa39e" : a === 1 ? "#b7eb8f" : "#fffb8f"
		} else{
			return a === 0 || a === 1 ? "#f5f5f5" : ""
		}
	}

	console.log(checkStore);
	return (
		<Spin spinning={loading} tip='Loading 😴 ...'>
			<div className='d-flex flex-wrap aligin-items-center justify-content-center mb-4'>
				{data?.length
					? data?.map((e, i) => (
							<Button
								size='large'
								type={currentPage === i ? 'primary' : 'default'}
								className='py-1 px-4 mx-1 mb-2'
								style={{backgroundColor: getCheckSelect(i)}}
								onClick={() => setCurrentPage(i)}>
								{i + 1}
							</Button>
					  ))
					: null}
			</div>

			{data?.length
				? data?.map((e, i) =>
						currentPage === i ? (
							<>
								<Card
									title={e?.question}
									actions={[
										<Button type='primary' size='large' disabled={currentPage===0} onClick={() => setCurrentPage(prevState => --prevState)} >
											Previous
										</Button>,
										<Button type='primary' onClick={() => setIsSubmit(true)} danger size='large'>
											Finish
										</Button>,
										<Button type='primary' size='large' disabled={currentPage === data?.length-1} onClick={() => setCurrentPage(prevState => ++prevState)} >
											Next
										</Button>,
									]}>
									<Answer data={e} idx={i} checker={checkStore} setChecker={setCheckStore} isSubmit={isSubmit} />
								</Card>
							</>
						) : null,
				  )
				: null}
		</Spin>
	);
};

export default TestContainer;
