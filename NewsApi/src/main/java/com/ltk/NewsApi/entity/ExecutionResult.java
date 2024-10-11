package com.ltk.NewsApi.entity;

public class ExecutionResult {
    private Object result;
    private double executionTime;

    public ExecutionResult(Object result, double executionTime) {
        this.result = result;
        this.executionTime = executionTime;
    }

    // Getter và Setter
    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }
}
