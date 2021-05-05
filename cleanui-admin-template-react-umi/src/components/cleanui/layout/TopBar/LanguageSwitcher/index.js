import React from 'react'
import { Menu, Dropdown } from 'antd'
import { setLocale, getLocale } from 'umi'
import styles from './style.module.scss'

const LanguageSwitcher = () => {
  const selectedLocale = getLocale()
  const language = selectedLocale.substr(0, 2)
  const changeLanguage = ({ key }) => {
    setLocale(key)
  }
  const menu = (
    <Menu selectedKeys={[selectedLocale]} onClick={changeLanguage}>
      <Menu.Item key="en-US">
        <span className="text-uppercase font-size-12 mr-2">EN</span>
        English
      </Menu.Item>
      <Menu.Item key="fr-FR">
        <span className="text-uppercase font-size-12 mr-2">FR</span>
        French
      </Menu.Item>
      <Menu.Item key="ru-RU">
        <span className="text-uppercase font-size-12 mr-2">RU</span>
        Русский
      </Menu.Item>
      <Menu.Item key="zh-CN">
        <span className="text-uppercase font-size-12 mr-2">CN</span>
        简体中文
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className={styles.dropdown}>
        <span className="text-uppercase">{language}</span>
      </div>
    </Dropdown>
  )
}

export default LanguageSwitcher
