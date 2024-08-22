import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type TArticleParamsForm = {
	onSubmit: (options: ArticleStateType) => void
	onReset: () => void
	onClose?: () => void
	onChange?: () => void
}

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const { onSubmit, onReset, onClose, onChange } = props

	const [formState, setFormState] = useState(defaultArticleState)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const openForm = () => {
		setIsOpen(prev => !prev)
	}

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setFormState({
			...formState,
			[type]: value
		})
	}

	const rootRef = useRef<HTMLDivElement | null>(null)

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault()
		onSubmit(formState)
	}

	const handleReset = () => {
		onReset()
		setFormState(defaultArticleState)
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={openForm} isOpen={isOpen} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen, [styles.container]: !isOpen })} >
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset} >
					<Select title='шрифт' options={fontFamilyOptions} selected={formState.fontFamilyOption} onChange={(value) => handleChange('fontFamilyOption', value)} />
					<RadioGroup title='размер шрифта' options={fontSizeOptions} selected={formState.fontSizeOption} name='fontSize' onChange={(option) => handleChange('fontSizeOption', option)} />
					<Select title='Цвет шрифта' options={fontColors} selected={formState.fontColor} onChange={(option) => handleChange('fontColor', option)} />
					<Separator />
					<Select title='Цвет фона' options={backgroundColors} selected={formState.backgroundColor} onChange={(option) => handleChange('backgroundColor', option)} />
					<Select title='Ширина контента' options={contentWidthArr} selected={formState.contentWidth} onChange={(option) => handleChange('contentWidth', option)} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
