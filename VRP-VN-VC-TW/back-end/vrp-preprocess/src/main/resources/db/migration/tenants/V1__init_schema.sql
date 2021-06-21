-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `correlations`
--

DROP TABLE IF EXISTS `correlations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `correlations`
(
    `id`               bigint NOT NULL AUTO_INCREMENT,
    `created_at`       bigint       DEFAULT NULL,
    `updated_at`       bigint       DEFAULT NULL,
    `distance`         int    NOT NULL,
    `from_node_code`   varchar(255) DEFAULT NULL,
    `from_node_id`     bigint       DEFAULT NULL,
    `from_node_name`   varchar(255) DEFAULT NULL,
    `from_node_type`   varchar(255) DEFAULT NULL,
    `risk_probability` double       DEFAULT NULL,
    `time`             int    NOT NULL,
    `to_node_code`     varchar(255) DEFAULT NULL,
    `to_node_id`       bigint       DEFAULT NULL,
    `to_node_name`     varchar(255) DEFAULT NULL,
    `to_node_type`     varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers`
(
    `id`           bigint NOT NULL AUTO_INCREMENT,
    `created_at`   bigint       DEFAULT NULL,
    `updated_at`   bigint       DEFAULT NULL,
    `address`      varchar(255) DEFAULT NULL,
    `code`         varchar(255) DEFAULT NULL,
    `end_time`     bigint       DEFAULT NULL,
    `latitude`     double       DEFAULT NULL,
    `longitude`    double       DEFAULT NULL,
    `name`         varchar(255) DEFAULT NULL,
    `start_time`   bigint       DEFAULT NULL,
    `penalty_cost` double       DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `depots`
--

DROP TABLE IF EXISTS `depots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depots`
(
    `id`             bigint NOT NULL AUTO_INCREMENT,
    `created_at`     bigint       DEFAULT NULL,
    `updated_at`     bigint       DEFAULT NULL,
    `address`        varchar(255) DEFAULT NULL,
    `code`           varchar(255) DEFAULT NULL,
    `end_time`       bigint       DEFAULT NULL,
    `latitude`       double       DEFAULT NULL,
    `longitude`      double       DEFAULT NULL,
    `name`           varchar(255) DEFAULT NULL,
    `start_time`     bigint       DEFAULT NULL,
    `unloading_cost` double       DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `depots_products`
--

DROP TABLE IF EXISTS `depots_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depots_products`
(
    `depot_id`   bigint NOT NULL,
    `product_id` bigint NOT NULL,
    KEY          `FK8bm6ljgn3sr5u9jmsxu19qk5t` (`product_id`),
    KEY          `FKia5nam8biarus847bbpvxpy12` (`depot_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `good_groups`
--

DROP TABLE IF EXISTS `good_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `good_groups`
(
    `id`         bigint NOT NULL AUTO_INCREMENT,
    `created_at` bigint       DEFAULT NULL,
    `updated_at` bigint       DEFAULT NULL,
    `detail`     varchar(255) DEFAULT NULL,
    `name`       varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items`
(
    `id`              bigint NOT NULL AUTO_INCREMENT,
    `created_at`      bigint DEFAULT NULL,
    `updated_at`      bigint DEFAULT NULL,
    `capacity`        double NOT NULL,
    `price`           double NOT NULL,
    `quantity`        bigint NOT NULL,
    `weight`          double NOT NULL,
    `order_id`        bigint DEFAULT NULL,
    `product_id`      bigint DEFAULT NULL,
    `return_order_id` bigint DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY               `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
    KEY               `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
    KEY               `FKrkgya8kdex5s6t3eihv44ucwp` (`return_order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders`
(
    `id`                   bigint NOT NULL AUTO_INCREMENT,
    `created_at`           bigint       DEFAULT NULL,
    `updated_at`           bigint       DEFAULT NULL,
    `capacity`             double NOT NULL,
    `code`                 varchar(255) DEFAULT NULL,
    `delivery_after_time`  bigint       DEFAULT NULL,
    `delivery_before_time` bigint       DEFAULT NULL,
    `delivery_mode`        varchar(255) DEFAULT NULL,
    `intend_receive_time`  datetime     DEFAULT NULL,
    `order_value`          double       DEFAULT NULL,
    `time_service`         int          DEFAULT NULL,
    `time_loading`         int          DEFAULT NULL,
    `weight`               double NOT NULL,
    `customer_id`          bigint       DEFAULT NULL,
    `depot_id`             bigint       DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY                    `FKpxtb8awmi0dk6smoh2vp1litg` (`customer_id`),
    KEY                    `FKa9mxo3yl7060gsn3fm4tcvnrj` (`depot_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_exclude`
--

DROP TABLE IF EXISTS `product_exclude`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_exclude`
(
    `product_excluding_id` bigint NOT NULL,
    `excluded_product_id`  bigint NOT NULL,
    KEY                    `FKokqvbb3gymq9vlewt2wo1ok2t` (`excluded_product_id`),
    KEY                    `FKa3afs83q2341vkceao1xua6aj` (`product_excluding_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products`
(
    `id`             bigint NOT NULL AUTO_INCREMENT,
    `created_at`     bigint       DEFAULT NULL,
    `updated_at`     bigint       DEFAULT NULL,
    `capacity`       double NOT NULL,
    `code`           varchar(255) DEFAULT NULL,
    `height`         double NOT NULL,
    `length`         double NOT NULL,
    `name`           varchar(255) DEFAULT NULL,
    `price`          double NOT NULL,
    `weight`         double NOT NULL,
    `width`          double NOT NULL,
    `goods_group_id` bigint       DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY              `FKq4aa9loemw7eegmx0mjht58hh` (`goods_group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `return_orders`
--

DROP TABLE IF EXISTS `return_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_orders`
(
    `id`         bigint NOT NULL AUTO_INCREMENT,
    `created_at` bigint DEFAULT NULL,
    `updated_at` bigint DEFAULT NULL,
    `capacity`   double NOT NULL,
    `weight`     double NOT NULL,
    `order_id`   bigint DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `FK7lptnhci1qqu8rbe82tqcjpcv` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicle_exclude_goods_group`
--

DROP TABLE IF EXISTS `vehicle_exclude_goods_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_exclude_goods_group`
(
    `vehicle_id`     bigint NOT NULL,
    `goods_group_id` bigint NOT NULL,
    KEY              `FK19otvljv0ati71qyl8nkropwl` (`goods_group_id`),
    KEY              `FKnt3en2i2dh0p0ev3wr86619ho` (`vehicle_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles`
(
    `id`                    bigint NOT NULL AUTO_INCREMENT,
    `created_at`            bigint       DEFAULT NULL,
    `updated_at`            bigint       DEFAULT NULL,
    `available`             bit(1) NOT NULL,
    `average_fee_transport` double       DEFAULT NULL,
    `average_gas_consume`   double       DEFAULT NULL,
    `average_velocity`      double       DEFAULT NULL,
    `fixed_cost`            double       DEFAULT NULL,
    `driver_name`           varchar(255) DEFAULT NULL,
    `gas_price`             double       DEFAULT NULL,
    `height`                double NOT NULL,
    `length`                double NOT NULL,
    `max_capacity`          double       DEFAULT NULL,
    `max_load_weight`       double       DEFAULT NULL,
    `max_velocity`          double       DEFAULT NULL,
    `min_velocity`          double       DEFAULT NULL,
    `name`                  varchar(255) DEFAULT NULL,
    `type`                  varchar(255) DEFAULT NULL,
    `width`                 double NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicles_products`
--

DROP TABLE IF EXISTS `vehicles_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles_products`
(
    `id`         bigint NOT NULL AUTO_INCREMENT,
    `created_at` bigint DEFAULT NULL,
    `updated_at` bigint DEFAULT NULL,
    `maxNumber`  int    NOT NULL,
    `product_id` bigint DEFAULT NULL,
    `vehicle_id` bigint DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `FK45gu5sbah5ciu0lbxr2ksaj9h` (`product_id`),
    KEY          `FK1w4cdyjv1rrinpmhbn090wy2o` (`vehicle_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-14 22:02:00
