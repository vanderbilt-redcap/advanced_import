<?php namespace Vanderbilt\AdvancedImport\App\Traits;

trait CanCompareVersions {

	/**
     * extract major, minor and patch as integeres from a provided version string
     *
     * @param string $versionString
     * @return array [major=>int, minor=>int, patch=>int];
     */
    private function getSemanticVersioning($versionString)
    {
        $regExp = "/(?<major>\d+)(?:\.(?<minor>\d+))?(?:\.(?<patch>\d+))?/";
        preg_match($regExp, $versionString, $matches);
        $versioning = [
            'major' => intval($matches['major'] ?? 0),
            'minor' => intval($matches['minor'] ?? 0),
            'patch' => intval($matches['patch'] ?? 0),
        ];
        return $versioning;
    }

	/**
	 * compare two string versions.
	 * Returns
	 * 	- < 0 if version_A is less than version_B;
	 * 	- > 0 if version_A is greater than version_B
	 * 	- 0 if they are equal.
	 *
	 * @param string $version_A
	 * @param string $version_B
	 * @return int|bool
	 */
	public function compareVersions($version_A, $version_B, $operator=null)
	{
		$baseCompare = function($version_A, $version_B) {
			$orderedVersionTypes = ['major','minor','patch'];
			$versioningA = $this->getSemanticVersioning($version_A);
			$versioningB = $this->getSemanticVersioning($version_B);
			foreach ($orderedVersionTypes as $type) {
				$versioningAtype = $versioningA[$type] ?? 0;
				$versioningBtype = $versioningB[$type] ?? 0;
				if($versioningAtype>$versioningBtype) return -1;
				if($versioningAtype<$versioningBtype) return 1;
			}
			return 0;
		};
		$operatorCompare = function($operand1, $operand2, $operator) use($baseCompare){
			$result = $baseCompare($operand1,$operand2);
			switch ($operator) {
				case '<':
				case 'lt':
					return ($result===1);
					break;
				case '<=':
				case 'le':
					return ($result===1 || $result===0);
					break;
				case '>':
				case 'gt':
					return ($result===-1);
					break;
				case '>=':
				case 'ge':
					return ($result===-1 || $result===0);
					break;
				case '==':
				case '=':
				case 'eq':
					return ($result===0);
					break;
				case '!=':
				case '<>':
				case 'ne':
					return ($result!==0);
					break;
				default:
					return null;
					break;
			}
		};
		
		if(is_null($operator)) return $baseCompare($version_A, $version_B);
		else return $operatorCompare($version_A, $version_B, $operator);
	}

	/**
	 * apply a function to an array
	 * and return true as soon as
	 * the first element is true
	 *
	 * @param array $array
	 * @param callable $fn
	 * @return Boolean
	 */
	private static function array_any(array $array, callable $fn) {
		foreach ($array as $value) {
			if($fn($value)) {
				return true;
			}
		}
		return false;
	}

}