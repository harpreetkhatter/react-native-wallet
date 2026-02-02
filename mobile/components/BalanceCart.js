import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../assets/styles/home.styles.js'
import { COLORS } from '../constants/colors.js'

const BalanceCart = ({summary}) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>₹{parseFloat(summary?.balance || 0).toFixed(2) }</Text>
      {/* balancestats */}
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount,{color:COLORS.income}]}>+₹{parseFloat(summary?.income || 0).toFixed(2)}</Text>
        </View>
        
        <View style={[styles.balanceStatItem,styles.statDivider]}/>
          <View styles={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount,{color:COLORS.expense}]}>-₹{parseFloat(summary?.expenses || 0).toFixed(2) }</Text>
          </View>
        </View>
      </View>
   
  )
}

export default BalanceCart