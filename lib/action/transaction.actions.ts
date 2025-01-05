"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { calculateInterest, fetchMetalsPrices, parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const addTransaction = async (transaction: AddTransactionProps) => {
  const { vendorId, gold, silver, rentMoney,rentDate,userId,interestRate } = transaction;

  try {
    const { database } = await createAdminClient();

    const rentDateF  = new Date(rentDate).toISOString();
    const currentDate = new Date().toISOString();

    const addNewTransaction = {
      vendorId: vendorId,
      gold: gold,
      silver: silver,
      userId:userId,
      rentMoney:rentMoney,
      rentDate:rentDateF,
      interestRate:interestRate,
      createdDate:currentDate,
      isActive: true 
    }

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        ...addNewTransaction
      }
    )

    return parseStringify(newTransaction);

  } catch (error) {
    console.log(error);
  }
}

export const getTransactions = async ({userId}:getBanksProps) => {
  try {
      const { database } = await createAdminClient();
  

      const transactions = await database.listDocuments(
          DATABASE_ID!,
          TRANSACTION_COLLECTION_ID!,
          [Query.equal('userId', [userId])]
      )

      const values =  await fetchMetalsPrices();

      const returnData = {
        metal : values,
        transactions:parseStringify(transactions.documents)
      }

      return refineTransactions(returnData);
  }
  catch (error) {
      console.error(error);
  }
}

export const returnTransactionByTransactionId = async (transaction: Transaction) => {
  try {
    const { database } = await createAdminClient();
    const transId = transaction?.$id || ''; 
    const returnResult = await database.updateDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      transId, 
      {
        isActive:false,
        status:transaction.status, 
        goldCurrentPrice:transaction.goldCurrentPrice, 
        silverCurrentPrice:transaction.silverCurrentPrice, 
        totalInterest:transaction.totalInterest, 
        finalAmount:transaction.finalAmount, 
        assetValue:transaction.assetValue, 
        interestTime:transaction.interestTime, 
      }
    )

    return parseStringify(returnResult);

  } catch (error) {
    console.log('Return Transaction issue :',error);
  }
}


const refineTransactions = async ({metal, transactions}: any) => {

  const { goldPrice, silverPrice}  = metal;
  var returnTransactions : any = [];

  transactions!.map((transaction:any, index:string) =>{
    if(transaction.isActive){
      let temp = {
        amount:transaction.rentMoney,
        startDate:transaction.rentDate,
        endDate: new Date().toUTCString(),
        rate:transaction.interestRate,
      };
      let interCal = calculateInterest(temp);

      let goldCurrentPrice = goldPrice*transaction.gold;
      let silverCurrentPrice = silverPrice*transaction.silver;

      let assetValue = goldCurrentPrice + silverCurrentPrice;
      let difference = Number(assetValue) -  Number(interCal.totalAmount);

      let status = Number(difference) >= 0 ? 'Underpaid':'Overpaid' ;
      status = transaction.isActive ? status : 'Returned';

      returnTransactions.push({
          $id: transaction.$id,
          vendorId:transaction.vendorId,
          status,
          rentDate: transaction.rentDate,
          gold : transaction.gold,
          silver: transaction.silver,
          goldCurrentPrice : Number(goldCurrentPrice),
          silverCurrentPrice : Number(silverCurrentPrice),
          rentMoney : Number(transaction.rentMoney),
          interestRate : transaction.interestRate,
          totalInterest : Number(interCal.totalInterest),
          finalAmount : Number((Number(interCal.totalAmount) +Number(interCal.totalInterest))),
          assetValue : Number(assetValue),
          interestTime : interCal.time,
          isActive: transaction.isActive,
          createdDate : transaction.createdDate
      })
    }
    else {
      transaction.status = 'Returned';
      returnTransactions.push(transaction);
    }
  })
  
  const returnData = {
    metal ,
    transactions: returnTransactions
  }


  return returnData;
}

export const getTransactionDashboard = async ({userId}:getBanksProps) => {
    try {
        const { database } = await createAdminClient();
    
  
        const transactions = await database.listDocuments(
            DATABASE_ID!,
            TRANSACTION_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )
  
        const values =  await fetchMetalsPrices();
  
        const returnData = {
          metal : values,
          transactions:parseStringify(transactions.documents)
        }
        
        return refineTransactionsForDashboard(returnData);
    }
    catch (error) {
        console.error(error);
    }
}

const refineTransactionsForDashboard = async ({metal, transactions}: any) => {
  const { goldPrice, silverPrice}  = metal;
  var returnTransactions : any = [];
  var totalTransaction = {
      goldTotal : 0,
      silverTotal: 0,
      goldCurrentPriceTotal :0,
      silverCurrentPriceTotal : 0,
      rentMoneyTotal : 0,
      totalInterestTotal : 0,
      finalAmountTotal : 0,
      assetValueTotal : 0,
      isActiveTotal:0,
      returnedTotal: 0,
      underpaidTotal : 0,
      overpaidTotal: 0
  }

  transactions!.map((transaction:any, index:string) =>{
    if(transaction.isActive){
      let temp = {
        amount:transaction.rentMoney,
        startDate:transaction.rentDate,
        endDate: new Date().toUTCString(),
        rate:transaction.interestRate,
      };
      let interCal = calculateInterest(temp);

      let goldCurrentPrice = Number(goldPrice*transaction.gold);
      let silverCurrentPrice = Number(silverPrice*transaction.silver);

      let assetValue = goldCurrentPrice + silverCurrentPrice;
      let difference = Number(assetValue) -  Number(interCal.totalAmount);

      let status = Number(difference) >= 0 ? 'Underpaid':'Overpaid' ;
      status = transaction.isActive ? status : 'Returned';

      let tempTransaction = {
        $id: transaction.$id,
        vendorId:transaction.vendorId,
        status,
        rentDate: transaction.rentDate,
        gold : transaction.gold,
        silver: transaction.silver,
        goldCurrentPrice : goldCurrentPrice,
        silverCurrentPrice : silverCurrentPrice,
        rentMoney : Number(transaction.rentMoney),
        interestRate : transaction.interestRate,
        totalInterest : Number(interCal.totalInterest),
        finalAmount : Number((Number(interCal.totalAmount) +Number(interCal.totalInterest))),
        assetValue : Number(assetValue),
        interestTime : interCal.time,
        isActive: transaction.isActive,
        createdDate : transaction.createdDate
      }
      returnTransactions.push(tempTransaction);


      totalTransaction.goldTotal += transaction.gold;
      totalTransaction.silverTotal += transaction.silver;
      totalTransaction.goldCurrentPriceTotal += goldCurrentPrice;
      totalTransaction.silverCurrentPriceTotal += silverCurrentPrice;
      totalTransaction.rentMoneyTotal += transaction.rentMoney;
      totalTransaction.totalInterestTotal += Number(interCal.totalInterest);
      totalTransaction.finalAmountTotal += Number((Number(interCal.totalAmount) +Number(interCal.totalInterest)));
      totalTransaction.assetValueTotal += Number(assetValue);
      totalTransaction.isActiveTotal += 1;
      totalTransaction.underpaidTotal += status == 'Underpaid'? 1:0 ;
      totalTransaction.overpaidTotal +=  status == 'Overpaid'? 1:0 ;
    }
    else {
      transaction.status = 'Returned';
      returnTransactions.push(transaction);
      totalTransaction.returnedTotal += 1;
    }
  })
  
  const returnData = {
    metal ,
    transactions: returnTransactions,
    totalTransaction
  }


  return returnData;
}