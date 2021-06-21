package com.vrptwga.utils;

import com.vrptwga.concepts.Customer;
import com.vrptwga.concepts.Request;

import java.util.*;

public class CommonUtils {
    public static HashMap<Integer, Double> sortByValue(HashMap<Integer, Double> hm) {
        // Create a list from elements of HashMap
        List<Map.Entry<Integer, Double>> list =
                new LinkedList<Map.Entry<Integer, Double>>(hm.entrySet());

        // Sort the list
        Collections.sort(list, new Comparator<Map.Entry<Integer, Double>>() {
            public int compare(Map.Entry<Integer, Double> o1,
                               Map.Entry<Integer, Double> o2) {
                return (o1.getValue()).compareTo(o2.getValue());
            }
        });

        // put data from sorted list to hashmap
        HashMap<Integer, Double> temp = new LinkedHashMap<Integer, Double>();
        for (Map.Entry<Integer, Double> aa : list) {
            temp.put(aa.getKey(), aa.getValue());
        }
        return temp;
    }

    public static Integer getKeyOfMinValue(HashMap<Integer, Double> hm) {
        int keyOfMin = 0;
        double min = 99999999;
        for (Integer key : hm.keySet()) {
            double value = hm.get(key);
            if (value < min) {
                min = value;
                keyOfMin = key;
            }
        }
        return keyOfMin;
    }

    public static List<Customer> getDuplicateCustomer(List<Customer> customerInputList1, List<Customer> customerInputList2) {
        List<Customer> duplicateCustomers = new ArrayList<>();
        for (Customer customerInput1 : customerInputList1) {
            for (Customer customerInput2 : customerInputList2) {
                if (customerInput1.getId() == customerInput2.getId())
                    duplicateCustomers.add(customerInput1);
            }
        }
        return duplicateCustomers;
    }

    public static List<Request> getDuplicateRequest(List<Request> requestList1, List<Request> requestList2) {
        List<Request> duplicateRequests = new ArrayList<>();
        for (Request request1 : requestList1) {
            for (Request request2 : requestList2) {
                if (request1.getId() == request2.getId())
                    duplicateRequests.add(request1);
            }
        }
        return duplicateRequests;
    }

    public static List<Customer> removeCustomer(List<Customer> customerInputList, Customer removeCustomer) {
        for (int i = 0; i < customerInputList.size(); i++) {
            if (customerInputList.get(i).getId() == removeCustomer.getId())
                customerInputList.remove(i);
        }
        return customerInputList;
    }

    public static List<Customer> removeCustomers(List<Customer> customerInputList, List<Customer> removeCustomers) {
        for (Customer removeCustomer : removeCustomers) {
            removeCustomer(customerInputList, removeCustomer);
        }
        return customerInputList;
    }

    public static List<Request> removeRequest(List<Request> requestList, Request request) {
        for (int i = 0; i < requestList.size(); i++) {
            if (requestList.get(i).getId() == request.getId())
                requestList.remove(i);
        }
        return requestList;
    }

    public static List<Request> removeRequests(List<Request> requestList, List<Request> removeRequests) {
        for (Request removeRequest : removeRequests) {
            removeRequest(requestList, removeRequest);
        }
        return requestList;
    }

}
