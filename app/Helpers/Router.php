<?php
namespace Vanderbilt\AdvancedImport\App\Helpers;

use Authentication;

class Router {

    private $baseController;
    private $dispatcher;

    const API_TOKEN_PROTECTED = 'api_token_protected';
    const REDCAP_USER_PROTECTED = 'redcap_user_protected';
    
    function __construct($routes=[], $baseController)
    {
        $this->baseController = $baseController;
        $this->dispatcher = self::getDispatcher($routes);
    }

    /**
     * create a dispatcher and register the routes
     * each route is managed by a controller and one of it's functions.
     */
    private static function getDispatcher($routes)
    {
        $dispatcher = \FastRoute\simpleDispatcher(function(\FastRoute\RouteCollector $r) use($routes) {
            foreach($routes as $route)
            {
                $r->addRoute($route[0], $route[1], $route[2]);
            }
        });
        return $dispatcher;
    }

    /**
     * extract the route from the request uri.
     * If $get_param is defined get the route
     * from the corresponding $_GET param
     *
     * @param string $get_param
     * @return string
     */
    static function extractRoute($get_param=null)
    {
        if(isset($get_param))
        {
            $route = isset($_GET[$get_param]) ? $_GET[$get_param] : '';
        }else {
            $uri = $_SERVER['REQUEST_URI'];
            
            // Strip query string (?foo=bar) and decode URI
            if (false !== $pos = strpos($uri, '?')) {
                $uri = substr($uri, 0, $pos);
            }
            $module_dir = basename(dirname(__DIR__));
            $re = '/.*'.preg_quote($module_dir).'\/api(\/.*)/';
            $route = preg_replace($re,'$1',$uri);
        }
        return rawurldecode($route);
    }

    function dispatch($route)
    {
        // get current fetch method and URI
        $httpMethod = $_SERVER['REQUEST_METHOD'];

        // dispatch the current route
        $routeInfo = $this->dispatcher->dispatch($httpMethod, $route);

        switch ($routeInfo[0]) {
            case \FastRoute\Dispatcher::NOT_FOUND:
                // ... 404 Not Found
                $this->baseController->notFound();
                break;
            case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
                $allowedMethods = $routeInfo[1];
                // ... 405 Method Not Allowed
                $this->baseController->notAllowed();
                break;
            case \FastRoute\Dispatcher::FOUND:
                $handler = $routeInfo[1];
                $route_data = $routeInfo[1];
                $handler = $route_data[0]; // extract the handler
                // extract the 'protected' attribute
                $protection = isset($route_data[1]) ? boolval($route_data[1]) : false;
                if($protection == self::API_TOKEN_PROTECTED) $this->checkApiToken();
                if($protection == self::REDCAP_USER_PROTECTED) $this->checkRedcapUser();
                $vars = $routeInfo[2];
                // ... call $handler with $vars
                list($class, $method) = explode("/", $handler, 2);
                call_user_func_array(array(new $class, $method), $vars);
                break;
        } 
    }

    private function checkRedcapUser()
    {
        try {
            return Authentication::authenticate();
        } catch (\Exception $e) {
            $message = $e->getMEssage();
            $status_code = $e->getCode() ?: 401;
            $response = array(
                "error" => true,
                "message" => $message,
            );
            $this->baseController->printJSON($response, $status_code);
        }
    }

    private function checkApiToken()
    {
        global $module;
        try {
            $api_token = $module->getApiToken();
            // disable control if the API token is not set
            if(empty($api_token)) return;
            $request_api_token = $_REQUEST['api_token'];
            if(empty($request_api_token)) throw new \Exception("An API token must be provided", 1);
            if($api_token != $request_api_token) throw new \Exception("Invalid API token", 1);
        } catch (\Exception $e) {
            $message = $e->getMEssage();
            $status_code = $e->getCode() ?: 401;
            $response = array(
                "error" => true,
                "message" => $message,
            );
            $this->baseController->printJSON($response, $status_code);
        }
    }


    /**
     * can be useful for debugging purposes
     */
    private static function getRequestedURI()
    {
        $server = $_SERVER;
        // store request link for testing
        $request_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        return $request_link;
    }
}