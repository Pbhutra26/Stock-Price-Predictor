const yahoo = require("yahoo-finance-history");
const brain=require('brain.js');
global.fetch = require('node-fetch');

const stockSymbols=["AMZN","MSFT","GOOG"];

var inputData=[];
const getData=(data)=>{
   inputData.push(data);
}


(async () => {
    try {
           for(const stockSymbol of stockSymbols)
           {   let data = await yahoo.getPriceHistory(stockSymbol);
            console.log(' ');

           
            console.log("Results for stock:"+stockSymbol);

            const priceHistory = data.priceHistory;
    
    
            const numberOfDays=20;
    
            var i=numberOfDays;
    
            for (const price of priceHistory.split("\n").sort().reverse()) {
             
              if(i==numberOfDays)
              {
                i--;
              continue;
              } if(i--<0)break;
               getData(parseFloat(price.split(',')[4]));
           }
          var trainingData=inputData.reverse();
          console.log(trainingData);
          var average=0;
          for(datum of trainingData)
          average+=datum;
    
          average/=numberOfDays;
    
    var firstVal=trainingData[trainingData.length/2];
    
    let power=0;
    while(Math.floor(firstVal)>0) { 
       power++;
       firstVal/=10;
     }
    const div=trainingData[0]/Math.pow(10,power);
    
    trainingData=scaleDown(trainingData,power,div);
    
    
    
    
    
    var trainingDataANN=[];
    
    for(var i=step;i<numberOfDays;i++)
    {
        const x={
            input:trainingData.slice(i-step,i),
            output:[trainingData[i]]
        };
        trainingDataANN.push(x);
    }
    
    //ANN
    
    
    const ANNFunction=(activation)=>{console.log('Starting training ANN using '+ activation+' activation layer');
    console.log('   ');
    
    const ANNnet=new brain.NeuralNetwork( { 
        binaryThresh: 0.5,
        hiddenLayers: [3], 
        activation: activation, 
        reluAlpha: 0.01});
    
    ANNnet.train(trainingDataANN);
    var ANNsum=0,ANNSqSum=0;;
    for(let i=0;i<numberOfDays-step;i++)
    {
        console.log('The Prediction for price :'+scaleUp(trainingData[i+step],power,div)+'is :'+scaleUp(ANNnet.run(trainingData.slice(i,i+step)),power,div));
       console.log(scaleUp(ANNnet.run(trainingData.slice(i,i+step)),power,div)+': '+scaleUp(trainingData[i+step],power,div),2);
    }
    
    var MAE4=ANNsum/65;
    var MSE4=ANNSqSum/65;
    var RMSE4=Math.sqrt(MSE4);
    
    console.log('Mean Absolute Error: '+MAE4+", Error percentage:"+100*MAE4/average+'%');
    console.log('Mean Square Error: '+MSE4+", Error percentage:"+100*MSE4/(average*average)+'%');
    console.log('Root Mean Square Error: '+RMSE4+", Error percentage:"+100*RMSE4/average+'%');
    
    console.log('   ');
    console.log('ended training ANN');
    }
    
    
    
    ANNFunction('relu');
    ANNFunction('leaky-relu');
    ANNFunction('sigmoid');
    ANNFunction('tanh');
    
    
    
    
    
    
    
    
    //LSTM
    const LSTMfunction=(learningRate)=>{
        console.log('starting training LSTM with learning Rate: '+learningRate);
    
    const LSTMnet=new brain.recurrent.LSTMTimeStep({
        learningRate:learningRate
    });
    
        LSTMnet.train([trainingData]);
    
    console.log('   ');
    
    var sum=0,sqSum=0;
    
    for(let i=0;i<numberOfDays-step;i++)
    {
        console.log('The Prediction for Price '+scaleUp(trainingData[i+step],power,div)+' is: '+scaleUp(LSTMnet.run(trainingData.slice(i,i+step)),power,div));
        console.log(scaleUp(LSTMnet.run(trainingData.slice(i,i+step)),power,div)+': '+scaleUp(trainingData[i+step],power,div),2);
    }
    
    const MAE1=sum/65;
    const MSE1=sqSum/65;
    const RMSE1=Math.sqrt(MSE1);
    
    console.log('Mean Absolute Error: '+MAE1+", Error percentage:"+100*MAE1/average+'%');
    console.log('Mean Square Error: '+MSE1+", Error percentage:"+100*MSE1/(average*average)+'%');
    console.log('Root Mean Square Error: '+RMSE1+", Error percentage:"+100*RMSE1/average+'%');
    
    console.log('   ');
    console.log('ended training LSTM');
    console.log(' ');
    }
    
   
        LSTMfunction(0.3);
    
    
    RNN
    console.log('   ');
    
    
    console.log('Starting training RNN');
    console.log('       ');
    const RNNnet=new brain.recurrent.RNNTimeStep();
    RNNnet.train([trainingData]);
    
    
    
    var RNNsum=0,RNNsqSum=0;
    
    for(let i=0;i<numberOfDays-step;i++)
    {
        console.log(scaleUp(RNNnet.run(trainingData.slice(i,i+step)),power,div)+': '+scaleUp(trainingData[i+step],power,div));
        console.log(scaleUp(RNNnet.run(trainingData.slice(i,i+step)),power,div)+': '+scaleUp(trainingData[i+step],power,div),2);
    }
    
    const MAE2=RNNsum/65;
    const MSE2=RNNsqSum/65;
    const RMSE2=Math.sqrt(MSE2);
    
    console.log('Mean Absolute Error: '+MAE2+", Error percentage:"+100*MAE2/average+'%');
    console.log('Mean Square Error: '+MSE2+", Error percentage:"+100*MSE2/(average*average)+'%');
    console.log('Root Mean Square Error: '+RMSE2+", Error percentage:"+100*RMSE2/average+'%');
    
    console.log('       ');
    console.log('ended training RNN');
    
    console.log('   ');
    
    console.log('Starting training GRU');
    console.log('       ');
    const GRUnet=new brain.recurrent.GRUTimeStep();
    GRUnet.train([trainingData]);
    
    
    
    var GRUsum=0,GRUsqSum=0;
    
    for(let i=0;i<numberOfDays-step;i++)
    {
        console.log(scaleUp(GRUnet.run(trainingData.slice(i,i+step)),power,div)+': '+scaleUp(trainingData[i+step],power,div));
        console.log(scaleUp(GRUnet.run(trainingData.slice(i,i+step)),power,div)+': '+scaleUp(trainingData[i+step],power,div),2);
    }
    
    const MAE3=GRUsum/65;
    const MSE3=GRUsqSum/65;
    const RMSE3=Math.sqrt(MSE3);
    
    console.log('Mean Absolute Error: '+MAE3+", Error percentage:"+100*MAE3/average+'%');
    console.log('Mean Square Error: '+MSE3+", Error percentage:"+100*MSE3/(average*average)+'%');
    console.log('Root Mean Square Error: '+RMSE3+", Error percentage:"+100*RMSE3/average+'%');
    
    console.log('       ');
    console.log('ended training GRU');
    
    
    
    }
         
    
        }
       



    
    catch (ex) {
        console.log(ex);
    }
})();

const scaleDown=(data,power,div)=>{
    if(data.length===0)return [];
    const divider=Math.pow(10,power);
    
   const ans=data.map(e=>e/(divider*div));
//    console.log(ans);
   return ans;
}

const scaleUp=(number,power,div)=>
{
    return number*Math.pow(10,power)*div;
}