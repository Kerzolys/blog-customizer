import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';

export type TArticleParamsForm = {
	children: ReactNode
	onSubmit: () => void
	onReset: () => void
}

export const ArticleParamsForm = ({ children, onSubmit, onReset }: TArticleParamsForm) => {
	const [open, setOpen] = useState(false)
	const openForm = () => {
		setOpen(prev => !prev)
	}

	const formRef = useRef<HTMLFormElement | null>(null)

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault()
		onSubmit()
	}
	const handleReset = () => {
		onReset()
		formRef.current?.reset()
	}

	return (
		<>
			<ArrowButton onClick={openForm} isOpen={open} />
			<aside className={clsx(styles.container, { [styles.container_open]: open, [styles.container]: !open })} >
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
					{children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
