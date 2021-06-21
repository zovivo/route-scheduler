package com.vrptwga.initialization;

import com.vrptwga.representation.Individual;
import com.vrptwga.concepts.OptimizationScenario;

import java.util.ArrayList;
import java.util.List;


public class InitialPopulation {

    public static List<Individual> initPop(OptimizationScenario optimizationScenario) {
        List<Individual> initPop = new ArrayList<>();
        for (int i = 0; i < optimizationScenario.getPopSize(); i++) {
            Individual individual = Individual.createIndividual(optimizationScenario);
            if (individual == null) {
                individual = Individual.createInsteadIndividual(optimizationScenario);
                if (individual == null)
                    throw new NullPointerException();
            }
            initPop.add(individual);
            System.out.println("****\n" + individual + "****");
        }
        return initPop;
    }

}


