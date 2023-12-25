-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        8.0.31 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- jonggulog 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `jonggulog`;
CREATE DATABASE IF NOT EXISTS `jonggulog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jonggulog`;

-- 테이블 jonggulog.coin_data 구조 내보내기
DROP TABLE IF EXISTS `coin_data`;
CREATE TABLE IF NOT EXISTS `coin_data` (
  `ticker` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT ' ',
  `interval` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT ' ',
  `Open_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Open` float DEFAULT NULL,
  `High` float DEFAULT NULL,
  `Low` float DEFAULT NULL,
  `Close` float DEFAULT NULL,
  `Volume` float DEFAULT NULL,
  PRIMARY KEY (`ticker`,`interval`,`Open_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 jonggulog.coin_data:~0 rows (대략적) 내보내기
DELETE FROM `coin_data`;

-- 테이블 jonggulog.contact 구조 내보내기
DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL DEFAULT '0',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'title',
  `content` varchar(3000) NOT NULL DEFAULT '' COMMENT '내용 html',
  `fileId` varchar(3000) NOT NULL DEFAULT '' COMMENT '파일ID',
  `p_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성날짜',
  `owner` varchar(100) NOT NULL COMMENT '작성자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 jonggulog.contact:~2 rows (대략적) 내보내기
DELETE FROM `contact`;
INSERT INTO `contact` (`id`, `type`, `content`, `fileId`, `p_date`, `owner`) VALUES
	(1, 'improvement', 'a', '', '2023-12-25 07:51:46', 'tmp'),
	(2, 'program', 'sdxzc12', '', '2023-12-25 07:51:51', 'tmp');

-- 테이블 jonggulog.posting 구조 내보내기
DROP TABLE IF EXISTS `posting`;
CREATE TABLE IF NOT EXISTS `posting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'title',
  `content` varchar(3000) NOT NULL DEFAULT '' COMMENT '내용 html',
  `p_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성날짜',
  `owner` varchar(100) NOT NULL COMMENT '작성자',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 jonggulog.posting:~3 rows (대략적) 내보내기
DELETE FROM `posting`;
INSERT INTO `posting` (`id`, `title`, `content`, `p_date`, `owner`) VALUES
	(7, 'ARIA는 네이티브 HTML만으로 관리할 수 없는 접근성 문제를 해결하기 위해 사용된다. 예를들어 모달이나 슬라이더, 탭 패널은 이를 정확히 나타내는 네이티브 HTML 태그가 존재하지 않기 때문에 시각장애를 가진 사람은 해당 화면이 무엇을 나타내는지 확인할 수 없다. ARIA를 사용하면 일반 HTML로는 대체 불가능한 형식의 요소들도 스크린 리더가 올바르게 해석할 수 있다.', '<h2><strong>ARIA는 네이티브 HTML만으로 관리할 수 없는 접근성 문제를 해결하기 위해 사용된다.</strong></h2><p>예를들어 모달이나 슬라이더, 탭 패널은 이를 정확히 나타내는 네이티브 HTML 태그가 존재하지 않기 때문에 시각장애를 가진 사람은 해당 화면이 무엇을 나타내는지 확인할 수 없다.</p><p>ARIA를 사용하면 일반 HTML로는 대체 불가능한 형식의 요소들도 스크린 리더가 올바르게 해석할 수 있다.</p>', '2023-12-19 07:40:10', '이종호'),
	(8, '업데이트 2023-12-20', '<h2><strong>ARIA는 네이티브 HTML만으로 관리할 수 없는 접근성 문제를 해결하기 위해 사용된다.</strong></h2><p>예를들어 모달이나 슬라이더, 탭 패널은 이를 정확히 나타내는 네이티브 HTML 태그가 존재하지 않기 때문에 시각장애를 가진 사람은 해당 화면이 무엇을 나타내는지 확인할 수 없다.</p>', '2023-12-19 07:41:31', '이종호'),
	(9, '라우터테스트', '<p>ㅇㅇ</p>', '2023-12-19 07:44:44', '이종호');

-- 테이블 jonggulog.posting_tags 구조 내보내기
DROP TABLE IF EXISTS `posting_tags`;
CREATE TABLE IF NOT EXISTS `posting_tags` (
  `id` int NOT NULL COMMENT 'posting_foriegn',
  `tags` varchar(30) NOT NULL COMMENT '포스팅 태그'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 jonggulog.posting_tags:~5 rows (대략적) 내보내기
DELETE FROM `posting_tags`;
INSERT INTO `posting_tags` (`id`, `tags`) VALUES
	(7, '업데이트'),
	(7, '잡다구리'),
	(8, '업데이트'),
	(8, '테스트'),
	(9, '테스트');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
