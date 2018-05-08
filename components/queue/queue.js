/*
    Author: JamesZ, lijiahao
    Date: 2018/5/8
    Description: Javascript queue
    Dependencie: None
*/
/*
    How to use this:
    var myQueue = new queue();
    myQueue.push(foo);
    var bar = myQueue.pull();
*/
function queue(){
    this.tail = 1;//index starts at 1
    this.head = 1;
    this.itemList = {};
    //return the size of the queue
    this.size = function(){
        return this.head - this.tail;
    }
    //Check if the queue is empty
    this.empty = function(){
        return this.size() <= 0 ? 1 : 0;
    }
    //push an item into the beginning of the queue
    this.push = function(item){
        this.itemList[this.head] = item;
        this.head++;
        return;
    }
    //return the item at the end of the queue and remove it from the queue
    this.pull = function(){
        if (this.empty()){
            return null;
        }
        var result;
        result = this.itemList[this.tail];
        delete this.itemList[this.tail];
        this.tail++;
        return result
    }
    //empty the queue
    this.init = function(){
        while (!this.empty()){
            this.pull;
        }
        return;
    }
}