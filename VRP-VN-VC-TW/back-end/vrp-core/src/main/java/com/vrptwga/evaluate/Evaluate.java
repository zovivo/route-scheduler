package com.vrptwga.evaluate;

import com.vrptwga.representation.Individual;

import java.util.Comparator;
import java.util.List;

public class Evaluate {

    private static final double alpha = 30; //weight for the number of vehicle
    private static final double beta = 0.1; //weight for the total distance

    public static List<Individual> weightedSumMethod(List<Individual> population) {
        for (Individual individual : population) {
            individual.setFitness(calculateFitness(individual));
        }
        population.sort(Comparator.comparingDouble(Individual::getFitness));
        return population;
    }

    public static double calculateFitness(Individual individual) {
        individual.calculateTotal();
        double fitness = alpha * individual.getJourneys().size() + beta * individual.getTotalCost();
        return fitness;
    }

    public static List<Individual> setElites(List<Individual> currentPopulation, List<Individual> elites, int eliteSize) {
        elites.clear();
        for (Individual individual : currentPopulation) {
            if (elites.isEmpty())
                elites.add(individual);
            else {
                if (!individual.hasSameRoutes(elites.get(elites.size() - 1)))
                    elites.add(individual);
            }
            if (elites.size() == eliteSize)
                break;
        }
        return elites;
    }

}