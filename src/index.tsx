import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from './constants/articleProps';
import { Select } from './components/select';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { RadioGroup } from './components/radio-group';
import { Separator } from './components/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption)
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption)
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor)
	const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor)
	const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth)
	const [options, setOptions] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	})


	const handleOptions = (option: OptionType, setter: React.Dispatch<React.SetStateAction<OptionType>>) => {
		setter(option)
	}

	const handleSubmit = () => {
		setOptions({
			'--font-family': fontFamily.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': contentWidth.value,
			'--bg-color': backgroundColor.value,
		})
	}

	const handleReset = () => {
		setOptions({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		})
		setFontFamily(defaultArticleState.fontFamilyOption)
		setFontSize(defaultArticleState.fontSizeOption)
		setFontColor(defaultArticleState.fontColor)
		setBackgroundColor(defaultArticleState.backgroundColor)
		setContentWidth(defaultArticleState.contentWidth)
	}

	return (
		<div
			className={clsx(styles.main)}
			style={options as CSSProperties}>
			<ArticleParamsForm onSubmit={handleSubmit} onReset={handleReset}>
				<Select title='шрифт' options={fontFamilyOptions} selected={fontFamily} onChange={(option) => handleOptions(option, setFontFamily)} />
				<RadioGroup title='размер шрифта' options={fontSizeOptions} selected={fontSize} name='fontSize' onChange={(option) => handleOptions(option, setFontSize)} />
				<Select title='Цвет шрифта' options={fontColors} selected={fontColor} onChange={(option) => handleOptions(option, setFontColor)} />
				<Separator />
				<Select title='Цвет фона' options={backgroundColors} selected={backgroundColor} onChange={(option) => handleOptions(option, setBackgroundColor)} />
				<Select title='Ширина контента' options={contentWidthArr} selected={contentWidth} onChange={(option) => handleOptions(option, setContentWidth)} />
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
