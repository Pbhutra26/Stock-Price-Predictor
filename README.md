In this project, techniques of predicting future stock prices have been explored. This will be
useful as this will help us take major decision on whether the stock should be purchased or
sold to make profits. This will help us take proper decisions regarding stocks. The data
needed for this has been taken from Yahoo stock API. The editor used for this project is
JavaScript. This is time series data of 50 stocks. 4 methods: RNN (Recurrent Neural
Network), LSTM (Long Short Term Memory), ANN (Artificial Neural Network), and GRU
(Gated Recurrent Unit) are used for predicting stock prices and checked which method is
better to use. Further for ANN, different activation layers are used to check how different
activation layer give what results on stock price data. Different learning rates are used for
LSTM and the one which gave the least error was chosen. The evaluation metrics used for
this project are: Mean Absolute Error (MAE), Mean Squared Error (MSE) and Root Mean
Squared Error (RMSE). GRU and LSTM gave the best results. GRU error rate was a little
lower than it should be as GRU works well for smaller datasets. GRU computation was faster
than LSTM as it has less operations to complete as compared to LSTM. ANN with Leaky
ReLu gave the best accuracy. Tanh was the second closest in terms of accuracy. RNN didn’t
provide good results as the gradient of the loss function decays exponentially with time and
to cope with it, it doesn’t have special units which LSTM and GRU have.
Keywords: Yahoo Stock API, ANN, LSTM, RNN, GRU, ReLu, Leaky ReLu, Tanh,
Sigmoid, MAE, MSE, RMSE
