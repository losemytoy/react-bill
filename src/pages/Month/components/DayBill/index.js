import classNames from 'classnames'
import './index.scss'
import {useMemo} from "react";

const DailyBill = ({date, billList}) => {
  const dayList = useMemo(() => {
    const pay = billList.filter(bill => bill.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(bill => bill.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  })


  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayList.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayList.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayList.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill