import {Button, DatePicker, Input, NavBar} from 'antd-mobile'


import classNames from 'classnames'
import './index.scss'
import {useNavigate} from 'react-router-dom'
import Icon from "../../components/Icon";
import {billListData} from "../../contents";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addBillList} from "../../store/modules/billStore";
import {value} from "lodash/seq";
import dayjs from "dayjs";

const New = () => {
  const navigate = useNavigate()
  const [billType, setBillType] = useState('pay')

  const [money, setMoney] = useState(0)

  const moneyChange = (value) => {
    setMoney(value)
  }

  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: date ?? new Date(),
      useFor: useFor
    }
    dispatch(addBillList(data))
  }
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState()
  const dateConfirm = (value) => {
    setDate(value)
    setDateVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon"/>
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type}/>
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New