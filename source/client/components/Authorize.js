import React from 'react';
import styled from 'emotion/react';

import Button from './Button';

const imageSource = 'data:image/svg+xml,%3Csvg width%3D%2270%22 height%3D%2226%22 viewBox%3D%220 0 70 26%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Ecompany_ru_70x26%3C%2Ftitle%3E%3Cg fill%3D%22%23fff%22 fill-rule%3D%22evenodd%22%3E%3Cpath d%3D%22M36.607 20.96h-1.29L35.31 6.992h-7.544V8.36c0 4.262-.156 9.196-1.64 12.6h-.998v5.036h2.257v-3h6.965v3h2.257V20.96zm10.34-.912c-.644.445-1.772 1.08-3.19 1.08-2 0-3.032-1.907-3.032-5.534h6.77v-1.367c0-5.44-1.772-7.444-4.48-7.444-3.45 0-4.902 3.754-4.902 8.907 0 4.93 2.064 7.57 5.417 7.57 1.612 0 2.967-.51 4-1.304l-.582-1.908zM21.097 6.995v6.835h-3.74V6.995h-2.513V23h2.515v-7.213h3.74V23h2.482V6.996H21.1zM56.896 23h2.74l-4.61-8.477 4.03-7.54h-2.547l-3.902 7.413V6.984H50.09V23h2.515v-7.968L56.895 23zm12.02-.99l-.58-1.844c-.58.51-1.515.986-2.74.986-2.032 0-3-2.29-3-6.298 0-4.04 1.29-6.044 3.097-6.044 1.032 0 2 .54 2.677 1.113l.354-2.354c-.71-.447-1.548-.83-3-.83-3.804 0-5.77 3.214-5.77 8.24 0 5.47 2.095 8.24 5.577 8.24 1.484 0 2.515-.48 3.386-1.21zm-36.083-.967h-4.32c1.355-3.403 1.516-8.334 1.516-11.706V9.05h2.805v11.993zM43.02 8.86c1.452 0 1.903 2.004 1.903 4.74h-4.16c.162-2.863.71-4.74 2.258-4.74zM9.017 14.473v8.494H11.5V0H7.792C4.148 0 1.117 2.497 1.117 7.46c0 3.405 1.322 5.39 3.354 6.41L.15 22.966h2.87l3.934-8.494h2.063zm.005-1.982H7.7c-2.16 0-3.943-1.277-3.943-5.1 0-4.016 1.944-5.1 3.943-5.1h1.322v10.2z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const Container = styled.div`
	display: flex;
	flex: 1;
	justifyContent: center;
	alignItems: center;
`;

const YandexButton = styled(Button)`
	background: #e61400;
	height: 70px;
	color: white;
	outline: none;
	paddingBottom: 3px;

	&:focus,
	&:hover {
		background-color: #d21200;
		color: white;
	}
`;

export default function Authrorize() {
	return (
		<Container>
			<YandexButton bgColor='#e61400' onClick={() => { window.location.href = '/auth/yandex' ;}}>
				<div style={{marginBottom: '3px'}}>войти через</div>
				<img src={imageSource} alt='Яндекс' />
			</YandexButton>
		</Container>
	);
}
