import { CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, } from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
  const defaultOptions = {
    '--font-family': defaultArticleState.fontFamilyOption.value,
    '--font-size': defaultArticleState.fontSizeOption.value,
    '--font-color': defaultArticleState.fontColor.value,
    '--container-width': defaultArticleState.contentWidth.value,
    '--bg-color': defaultArticleState.backgroundColor.value,
  }

  const [options, setOptions] = useState(defaultOptions)

  return (
    <div
      className={clsx(styles.main)}
      style={options as CSSProperties}>
      <ArticleParamsForm setOptions={
        (newFormState) => setOptions({
          '--font-family': newFormState.fontFamilyOption.value,
          '--font-size': newFormState.fontSizeOption.value,
          '--font-color': newFormState.fontColor.value,
          '--container-width': newFormState.contentWidth.value,
          '--bg-color': newFormState.backgroundColor.value,
        })
      } />
      <Article />
    </div>
  );
};

