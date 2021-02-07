using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DDDSample1.Domain.Trips;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace Tests
{
    [TestClass]
    public class TripTest
    {
        Trip trip = new Trip();

        [TestMethod]
        public void isNull_ParameterIsNull_ThrowsException(){
            string message = "This should throw an exception";

            var result = Assert.ThrowsException<BusinessRuleValidationException>(() => trip.isNull(null,message));

            Assert.AreEqual(result.Message,message);
        }

        [TestMethod]
        public void isNull_NormalParameter_ReturnsTrue(){
            string message = "This shouldn't be an exception!";

            var result = trip.isNull("String",message);

            Assert.AreEqual(result,true);
        }


        [TestMethod]
        public void ConvertIntsToPassingTimes_NullList_ThrowsException(){
            List<int> list = null;

            var result = Assert.ThrowsException<NullReferenceException>(() => trip.convertIntsToPassingTimes(list));
        }

        [TestMethod]
        public void ConvertIntsToPassingTimes_EmptyList_ThrowsException(){
            List<int> list = new List<int>();

            List<PassingTime> result = trip.convertIntsToPassingTimes(list);
            Assert.AreEqual(result.Count,0);
            CollectionAssert.AreEqual(result, list);
        }

        [TestMethod]
        public void ConvertIntsToPassingTimes_NormalList_ReturnsExpectedResult(){
            List<int> list = new List<int>();
            List<PassingTime> expectedResult = new List<PassingTime>();
            expectedResult.Add(new PassingTime(1));
            expectedResult.Add(new PassingTime(40));
            expectedResult.Add(new PassingTime(10000));
            expectedResult.Add(new PassingTime(0));
            expectedResult.Add(new PassingTime(-1));
            list.Add(1);
            list.Add(40);
            list.Add(100000);
            list.Add(0);
            list.Add(-1);

            List<PassingTime> result = trip.convertIntsToPassingTimes(list);
            Assert.AreEqual(result.Count,5);
        }

        public void toString_Normal_ReturnsExpectedResult(){
            List<int> list = new List<int>();
            list.Add(1);
            list.Add(40);
            list.Add(100000);
            list.Add(0);
            list.Add(-1);
            Trip trip1 = new Trip("m1m2m3m4m5","Line:1","Path:1",list);
            string expectedResult = "Trip: m1m2m3m4m5 Line: Line:1 Path: Path:1";

            string result = trip.ToString();
            Assert.AreEqual(result,expectedResult);
        }
        
    }
}
