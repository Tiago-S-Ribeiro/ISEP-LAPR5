using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Workblocks{
    public class WorkblockId : EntityId{
        
        [JsonConstructor]
        public WorkblockId(Guid value) : base(value){
        }

        public WorkblockId(String value) : base(value){
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }
        
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}