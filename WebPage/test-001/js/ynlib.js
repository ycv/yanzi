// Extend Array Object

if (Array.prototype.index==null)  Array.prototype.index = function(value)
{
  for(var i=0;i<this.length;i++){ 
   if(this[i]==value)
  return i;
  }
}	
